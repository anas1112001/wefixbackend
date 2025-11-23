
import UserRepository from '../../service/User/repository/UserRepository'
import CompanyRepository from '../../service/Company/repository/CompanyRepository'
import IndividualRepository from '../../service/Individual/repository/IndividualRepository'
import CountryRepository from '../../service/Country/repository/CountryRepository'
import EstablishedTypeRepository from '../../service/EstablishedType/repository/EstablishedTypeRepository'
import UserRoleRepository from '../../service/UserRole/repository/UserRoleRepository'
import TeamLeaderRepository from '../../service/TeamLeader/repository/TeamLeaderRepository'
import LookupRepository from '../../service/Lookup/repository/LookupRepository'

export interface ContextServices {
  companyRepository: CompanyRepository;
  countryRepository: CountryRepository;
  establishedTypeRepository: EstablishedTypeRepository;
  individualRepository: IndividualRepository;
  lookupRepository: LookupRepository;
  teamLeaderRepository: TeamLeaderRepository;
  userRepository: UserRepository;
  userRoleRepository: UserRoleRepository;
}

export const createContextServices = async (): Promise<ContextServices> => {
  const companyRepository = new CompanyRepository();
  const countryRepository = new CountryRepository();
  const establishedTypeRepository = new EstablishedTypeRepository();
  const individualRepository = new IndividualRepository();
  const lookupRepository = new LookupRepository();
  const teamLeaderRepository = new TeamLeaderRepository();
  const userRepository = new UserRepository();
  const userRoleRepository = new UserRoleRepository();

  return {
    companyRepository,
    countryRepository,
    establishedTypeRepository,
    individualRepository,
    lookupRepository,
    teamLeaderRepository,
    userRepository,
    userRoleRepository
  };
};

