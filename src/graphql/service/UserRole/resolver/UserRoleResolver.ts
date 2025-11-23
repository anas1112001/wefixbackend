import { ApolloError } from 'apollo-server-express';
import { Ctx, Query, Resolver } from 'type-graphql';
import UserRoleRepository from '../repository/UserRoleRepository';
import { UserRoleType } from '../typedefs/UserRole/schema/UserRole.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class UserRoleResolver {
  @Query(() => [UserRoleType], { description: 'Get all active user roles' })
  public async getUserRoles(@Ctx() { services }: SharedContext): Promise<UserRoleType[]> {
    try {
      return await services.userRoleRepository.getUserRoles();
    } catch (error) {
      throw new ApolloError(`Error retrieving user roles: ${error.message}`, 'USER_ROLES_QUERY_ERROR');
    }
  }
}

