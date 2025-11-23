
import UserRepository from '../../service/User/repository/UserRepository'
import CompanyRepository from '../../service/Company/repository/CompanyRepository'
import IndividualRepository from '../../service/Individual/repository/IndividualRepository'
import CountryRepository from '../../service/Country/repository/CountryRepository'
import EstablishedTypeRepository from '../../service/EstablishedType/repository/EstablishedTypeRepository'
import UserRoleRepository from '../../service/UserRole/repository/UserRoleRepository'

export interface ContextServices {
  companyRepository: CompanyRepository;
  countryRepository: CountryRepository;
  establishedTypeRepository: EstablishedTypeRepository;
  individualRepository: IndividualRepository;
  userRepository: UserRepository;
  userRoleRepository: UserRoleRepository;
}

export const createContextServices = async (): Promise<ContextServices> => {
  const companyRepository = new CompanyRepository();
  const countryRepository = new CountryRepository();
  const establishedTypeRepository = new EstablishedTypeRepository();
  const individualRepository = new IndividualRepository();
  const userRepository = new UserRepository();
  const userRoleRepository = new UserRoleRepository();

  return {
    companyRepository,
    countryRepository,
    establishedTypeRepository,
    individualRepository,
    userRepository,
    userRoleRepository
  };
};

