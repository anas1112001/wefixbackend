
import UserRepository from '../../service/User/repository/UserRepository'
import CompanyRepository from '../../service/Company/repository/CompanyRepository'
import IndividualRepository from '../../service/Individual/repository/IndividualRepository'

export interface ContextServices {
  companyRepository: CompanyRepository;
  individualRepository: IndividualRepository;
  userRepository: UserRepository;
}

export const createContextServices = async (): Promise<ContextServices> => {
  const companyRepository = new CompanyRepository();
  const individualRepository = new IndividualRepository();
  const userRepository = new UserRepository();

  return {
    companyRepository,
    individualRepository,
    userRepository
  };
};

