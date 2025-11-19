
import UserRepository from '../../service/User/repository/UserRepository'

export interface ContextServices {
  userRepository: UserRepository;
}

export const createContextServices = async (): Promise<ContextServices> => {
  const userRepository = new UserRepository();

  return {
    userRepository
  };
};

