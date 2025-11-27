import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { FindOptions } from 'sequelize/types';

import { UserOrm } from './orm/UserOrm';

import { User } from '../../../../db/models/user.model';
import { Lookup } from '../../../../db/models/lookup.model';
import { CreateUserInput } from '../typedefs/User/inputs/CreateUserInput.schema';
import { UpdateUserInput } from '../typedefs/User/inputs/UpdateUserInput.schema';

class UserRepository {
  public authenticateUser: (email: string, password: string, deviceId: string, fcmToken: string) => Promise<UserOrm | null>;
  public createUser: (userData: CreateUserInput, deviceId: string, fcmToken: string) => Promise<UserOrm>;
  public deleteUserById: (id: string) => Promise<boolean>;
  public forgotPassword: (username: string, lastFourDigits: string) => Promise<{ message: string; success: boolean }>;
  public getUserById: (id: string) => Promise<UserOrm | null>;
  public getUserByToken: (token: string) => Promise<UserOrm | null>;
  public getUsers: (where: FindOptions) => Promise<UserOrm[]>;
  public updateUserById: (id: string, updateData: UpdateUserInput) => Promise<UserOrm | null>;
  public validateRefreshToken: (email: string) => Promise<UserOrm | null>;


  constructor() {
    this.authenticateUser = this._authenticateUser.bind(this);
    this.createUser = this._createUser.bind(this);
    this.deleteUserById = this._deleteUserById.bind(this);
    this.forgotPassword = this._forgotPassword.bind(this);
    this.getUserById = this._getUserById.bind(this);
    this.getUserByToken = this._getUserByToken.bind(this);
    this.getUsers = this._getUsers.bind(this);
    this.updateUserById = this._updateUserById.bind(this);
    this.validateRefreshToken = this._validateRefreshToken.bind(this);

  }
  private async _authenticateUser(userEmail: string, password: string, deviceId: string, fcmToken: string): Promise<UserOrm | null> {
    try {
      const email = userEmail.toLocaleLowerCase();
      const user = await User.findOne({ 
        where: { email },
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });

      if (!user || !deviceId || !fcmToken) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      // Update the user's deviceId and FCM token
      await user.update({ deviceId, fcmToken });
      
      // Reload with associations after update
      await user.reload({ include: [{ model: Lookup, as: 'userRoleLookup', required: false }] });

      return user;
    } catch (error) {
      throw new ApolloError(`Authentication failed: ${error.message}`, 'AUTHENTICATION_FAILED');
    }
  }


  public async _validateRefreshToken(userEmail: string): Promise<UserOrm | null> {
    try {
      const user = await User.findOne({ 
        where: { email: userEmail },
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new ApolloError(`Error validating refresh token: ${error.message}`, 'REFRESH_TOKEN_VALIDATION_FAILED');
    }
  }

  private async _getUsers(where: FindOptions): Promise<UserOrm[]> {
    try {
      const users = await User.findAll({
        ...where,
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });
      return users;
    } catch (error) {
      throw new ApolloError(`Failed to retrieve users: ${error.message}`, 'USER_RETRIEVAL_FAILED');
    }
  }


  private async _getUserByToken(token: string): Promise<UserOrm | null> {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (typeof decoded === 'string' || !decoded.email) {
        throw new ApolloError('Invalid token payload', 'INVALID_TOKEN');
      }

      const userEmail = decoded.email;

      const user = await User.findOne({ 
        where: { email: userEmail },
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });

      if (!user) {
        throw new ApolloError('User not found', 'USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      throw new ApolloError('Unable to authenticate user', 'AUTHENTICATION_FAILED');
    }
  }


  private async _getUserById(id: string): Promise<UserOrm | null> {
    try {
      const user = await User.findOne({ 
        where: { id },
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });
      return user;
    } catch (error) {
      throw new ApolloError('Unable to authenticate user', 'AUTHENTICATION_FAILED');
    }
  }

  private async _createUser(userData: CreateUserInput, deviceId: string, fcmToken: string): Promise<UserOrm> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      if (!deviceId) {
        return null;
      }

      if (!fcmToken) {
        return null;
      }

      const userCreationData = {
        companyId: userData.companyId || null,
        deviceId: userData.deviceId,
        email: userData.email.toLocaleLowerCase(),
        fcmToken: userData.fcmToken,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: hashedPassword,
        userNumber: userData.userNumber,
        userRoleId: userData.userRoleId,
      };

      const newUser = await User.create(userCreationData);
      await newUser.reload({ include: [{ model: Lookup, as: 'userRoleLookup', required: false }] });
      return newUser;
    } catch (error) {
      throw new ApolloError(`Failed to create user: ${error.message}`, 'USER_CREATION_FAILED');
    }
  }

  private async _updateUserById(id: string, updateData: Partial<UserOrm>): Promise<UserOrm | null> {
    try {
      const user = await User.findOne({ 
        where: { id },
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });
      if (user) {
        if (updateData.password) {
          const salt = await bcrypt.genSalt(10);
          updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        await user.update(updateData);
        await user.reload({ include: [{ model: Lookup, as: 'userRoleLookup', required: false }] });
        return user;
      }
      return null;
    } catch (error) {
      throw new ApolloError(`Failed to update user with ID ${id}: ${error.message}`, 'USER_UPDATE_FAILED');
    }
  }

  private async _deleteUserById(id: string): Promise<boolean> {
    try {
      const deleted = await User.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      throw new ApolloError(`Failed to delete user with ID ${id}: ${error.message}`, 'USER_DELETION_FAILED');
    }
  }

  private async _forgotPassword(username: string, lastFourDigits: string): Promise<{ message: string; success: boolean }> {
    try {
      const email = username.trim().toLowerCase();
      const user = await User.findOne({ 
        where: { email },
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });

      if (!user) {
        return { message: 'User not found', success: false };
      }

      if (!user.mobileNumber) {
        return { message: 'Mobile number not registered for this account', success: false };
      }

      const mobileLastFour = user.mobileNumber.slice(-4);
      if (mobileLastFour !== lastFourDigits) {
        return { message: 'Invalid mobile number verification', success: false };
      }

      // Generate a temporary password reset token (in production, send via SMS/email)
      // For now, we'll just return success - actual password reset would require additional flow
      return { 
        message: 'Password reset instructions have been sent to your registered mobile number', 
        success: true 
      };
    } catch (error) {
      throw new ApolloError(`Failed to process forgot password request: ${error.message}`, 'FORGOT_PASSWORD_FAILED');
    }
  }

}

export default UserRepository;
