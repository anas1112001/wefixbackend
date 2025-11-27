import { ApolloError } from 'apollo-server-express'
import jwt from 'jsonwebtoken';
import { Resolver, Query, Arg, Ctx, Mutation, FieldResolver, Root } from 'type-graphql'

import { generateRefreshToken, generateToken } from '../../../../lib';
import { SharedContext } from '../../../shared/context'
import { CreateUserInput } from '../typedefs/User/inputs/CreateUserInput.schema';
import { ForgotPasswordInput } from '../typedefs/User/inputs/ForgotPasswordInput.schema';
import { LoginInput } from '../typedefs/User/inputs/LoginUserInput.schema';
import { UpdateUserInput } from '../typedefs/User/inputs/UpdateUserInput.schema';
import { CreateUserResponse } from '../typedefs/User/responses/CreateUserResponse.schema';
import { ForgotPasswordResponse } from '../typedefs/User/responses/ForgotPasswordResponse.schema';
import { LoginResponse } from '../typedefs/User/responses/LoginUserResponse.schema';
import { QueryUserResponse } from '../typedefs/User/responses/QueryUserResponse.schema';
import { QueryUsersResponse } from '../typedefs/User/responses/QueryUsersResponse.schema';
import { UpdateUserResponse } from '../typedefs/User/responses/UpdateUserResponse.schema';
import { AuthTokens } from '../typedefs/User/schema/AuthTokens.schema';
import { User } from '../typedefs/User/schema/User.schema';
import { LookupType } from '../../Lookup/typedefs/Lookup/schema/Lookup.schema';

@Resolver((_of) => QueryUsersResponse)
@Resolver(() => User)

export class UserResolver {
  @Mutation(() => LoginResponse, { description: 'Login a User' })
  public async login(
    @Arg('loginData') loginData: LoginInput,
    @Ctx() { services }: SharedContext
  ): Promise<LoginResponse> {

    try {
      const user = await services.userRepository.authenticateUser(loginData.email, loginData.password, loginData.deviceId, loginData.fcmToken);
      if (!user) {
        return { message: 'Invalid login credentials', token: null, user: null };
      }

      if (!loginData.deviceId) {
        return { message: 'device id is not passed', token: null, user: null };
      }


      if (!loginData.fcmToken) {
        return { message: 'FCM token is not passed', token: null, user: null };
      }

      // Generate access and refresh tokens
      const accessToken = generateToken(user);
      const refreshToken = generateRefreshToken(user);

      const authTokens = new AuthTokens();
      authTokens.accessToken = accessToken;
      authTokens.refreshToken = refreshToken;
      authTokens.tokenType = 'Bearer';
      authTokens.expiresIn = 3600;

      return { message: 'Login successful', token: authTokens, user };
    } catch (error) {
      throw new ApolloError(`Error during login: ${error.message}`, 'LOGIN_ERROR');
    }
  }


  @Mutation(() => AuthTokens, { description: 'Refresh Access Token' })
  public async refreshAccessToken(
    @Arg('token') token: string,
    @Ctx() { services, }: SharedContext
  ): Promise<AuthTokens> {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (typeof decoded === 'string' || !decoded.email) {
        throw new ApolloError('Invalid token payload', 'INVALID_TOKEN');
      }

      const user = await services.userRepository.validateRefreshToken(decoded.email);

      if (!user) {
        throw new ApolloError('Invalid refresh token', 'INVALID_TOKEN');
      }

      const accessToken = generateToken(user);
      const refreshToken = generateRefreshToken(user);

      const authTokens = new AuthTokens();
      authTokens.accessToken = accessToken;
      authTokens.refreshToken = refreshToken;
      authTokens.tokenType = 'Bearer';
      authTokens.expiresIn = 3600;

      return authTokens;

    } catch (error) {
      throw new ApolloError(`Error refreshing access token: ${error.message}`, 'TOKEN_REFRESH_ERROR');
    }
  }

  @Query((_returns) => QueryUsersResponse, {
    description: 'Query for a list of Users',
  })
  public async getAllUsers(@Ctx() { services }: SharedContext): Promise<QueryUsersResponse> {
    try {
      const users = await services.userRepository.getUsers({});
      return { message: 'Users fetched successfully', users, };
    } catch (error) {
      throw new ApolloError(`Error fetching users: ${error.message}`, 'FETCH_USERS_ERROR');
    }
  }

  @Query((_returns) => QueryUserResponse, {
    description: 'Query a User by token',
  })
  public async getUserByToken(@Arg('token') token: string, @Ctx() { services }: SharedContext): Promise<QueryUserResponse> {
    try {
      const user = await services.userRepository.getUserByToken(token);

      if (!user) {
        return { message: 'No user found with the provided token', user: null, };
      }
      return { message: 'User fetched successfully', user, };
    } catch (error) {
      throw new ApolloError(`Error fetching user with token ${token}: ${error.message}`, 'FETCH_USER_ERROR');
    }
  }

  @Query((_returns) => QueryUserResponse, {
    description: 'Query a User by token',
  })
  public async getUserById(@Arg('id') id: string, @Ctx() { services }: SharedContext): Promise<QueryUserResponse> {
    try {
      const user = await services.userRepository.getUserById(id);
      if (!user) {
        return { message: 'No user found with the provided ID', user: null };
      }

      if (!user) {
        return { message: 'No user found with the provided id', user: null, };
      }
      return { message: 'User fetched successfully', user, };
    } catch (error) {
      throw new ApolloError(`Error fetching user with id ${id}: ${error.message}`, 'FETCH_USER_ERROR');
    }
  }

  @Mutation((_returns) => CreateUserResponse, { description: 'Create a User' })
  public async createUser(
    @Arg('userData') userData: CreateUserInput,
    @Ctx() { services }: SharedContext
  ): Promise<CreateUserResponse> {
    try {
      const newUser = await services.userRepository.createUser(userData, userData.deviceId, userData.fcmToken);

      if (!newUser.deviceId) {
        return { message: 'device id is not passed', token: null, user: null };
      }

      if (!newUser.deviceId) {
        return { message: 'fcm token is not passed', token: null, user: null };
      }

      const accessToken = generateToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      const authTokens = new AuthTokens();
      authTokens.accessToken = accessToken;
      authTokens.refreshToken = refreshToken;
      authTokens.tokenType = 'Bearer';
      authTokens.expiresIn = 3600; // You might set a different value for refresh token expiry

      return { message: 'User created successfully', token: authTokens, user: newUser };
    } catch (error) {
      throw new ApolloError(`Error creating user: ${error.message}`, 'CREATE_USER_ERROR');
    }
  }

  @Mutation((_returns) => UpdateUserResponse, {
    description: 'Update an existing User',
  })
  public async updateUser(
    @Arg('id') id: string,
    @Arg('updateUserData') updateUserData: UpdateUserInput,
    @Ctx() { services }: SharedContext
  ): Promise<UpdateUserResponse> {
    try {
      const existingUser = await services.userRepository.getUserById(id);
      if (!existingUser) {
        return { message: 'No user found with the provided ID', user: null };
      }

      const user = await services.userRepository.updateUserById(id, updateUserData);
      return { message: 'User successfully updated', user };
    } catch (error) {
      throw new ApolloError(`Error updating user with ID ${id}: ${error.message}`);
    }
  }

  @Mutation(() => ForgotPasswordResponse, { description: 'Request password reset' })
  public async forgotPassword(
    @Arg('forgotPasswordData') forgotPasswordData: ForgotPasswordInput,
    @Ctx() { services }: SharedContext
  ): Promise<ForgotPasswordResponse> {
    try {
      const result = await services.userRepository.forgotPassword(
        forgotPasswordData.username,
        forgotPasswordData.lastFourDigits
      );
      return result;
    } catch (error) {
      throw new ApolloError(`Error processing forgot password request: ${error.message}`, 'FORGOT_PASSWORD_ERROR');
    }
  }

  @FieldResolver(() => LookupType, { nullable: true })
  public userRole(@Root() user: any): LookupType | null {
    return (user as any).userRoleLookup || null;
  }

}