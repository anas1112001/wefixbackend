
import UserRepository from '../../service/User/repository/UserRepository'
import CompanyRepository from '../../service/Company/repository/CompanyRepository'
import IndividualRepository from '../../service/Individual/repository/IndividualRepository'
import CountryRepository from '../../service/Country/repository/CountryRepository'
import EstablishedTypeRepository from '../../service/EstablishedType/repository/EstablishedTypeRepository'
import UserRoleRepository from '../../service/UserRole/repository/UserRoleRepository'
import TeamLeaderRepository from '../../service/TeamLeader/repository/TeamLeaderRepository'
import LookupRepository from '../../service/Lookup/repository/LookupRepository'
import ContractRepository from '../../service/Contract/repository/ContractRepository'
import BranchRepository from '../../service/Branch/repository/BranchRepository'
import ZoneRepository from '../../service/Zone/repository/ZoneRepository'
import MaintenanceServiceRepository from '../../service/MaintenanceService/repository/MaintenanceServiceRepository'
import MainServiceRepository from '../../service/MainService/repository/MainServiceRepository'
import SubServiceRepository from '../../service/SubService/repository/SubServiceRepository'

export interface ContextServices {
  branchRepository: BranchRepository;
  companyRepository: CompanyRepository;
  contractRepository: ContractRepository;
  countryRepository: CountryRepository;
  establishedTypeRepository: EstablishedTypeRepository;
  individualRepository: IndividualRepository;
  lookupRepository: LookupRepository;
  mainServiceRepository: MainServiceRepository;
  maintenanceServiceRepository: MaintenanceServiceRepository;
  subServiceRepository: SubServiceRepository;
  teamLeaderRepository: TeamLeaderRepository;
  userRepository: UserRepository;
  userRoleRepository: UserRoleRepository;
  zoneRepository: ZoneRepository;
}

export const createContextServices = async (): Promise<ContextServices> => {
  const branchRepository = new BranchRepository();
  const companyRepository = new CompanyRepository();
  const contractRepository = new ContractRepository();
  const countryRepository = new CountryRepository();
  const establishedTypeRepository = new EstablishedTypeRepository();
  const individualRepository = new IndividualRepository();
  const lookupRepository = new LookupRepository();
  const mainServiceRepository = new MainServiceRepository();
  const maintenanceServiceRepository = new MaintenanceServiceRepository();
  const subServiceRepository = new SubServiceRepository();
  const teamLeaderRepository = new TeamLeaderRepository();
  const userRepository = new UserRepository();
  const userRoleRepository = new UserRoleRepository();
  const zoneRepository = new ZoneRepository();

  return {
    branchRepository,
    companyRepository,
    contractRepository,
    countryRepository,
    establishedTypeRepository,
    individualRepository,
    lookupRepository,
    mainServiceRepository,
    maintenanceServiceRepository,
    subServiceRepository,
    teamLeaderRepository,
    userRepository,
    userRoleRepository,
    zoneRepository
  };
};

