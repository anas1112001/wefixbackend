import 'reflect-metadata';
import { Contract } from '../db/models/contract.model';
import { Company } from '../db/models/company.model';
import { Lookup, LookupCategory } from '../db/models/lookup.model';
import { orm } from '../db/orm';
import { CONTRACTS_DATA } from '../db/seeds/contractsSeed';

const seedContracts = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    // Get all companies
    const companies = await Company.findAll({ limit: 10 });
    if (companies.length === 0) {
      console.error('No companies found. Please seed companies first.');
      return;
    }

    // Get business model lookups
    const businessModels = await Lookup.findAll({
      where: { category: LookupCategory.BUSINESS_MODEL, isActive: true },
    });
    if (businessModels.length === 0) {
      console.error('No business models found. Please seed lookups first.');
      return;
    }

    // Check if contracts already exist
    const existingContracts = await Contract.count();
    if (existingContracts > 0) {
      console.log(`Contracts already exist (${existingContracts} records). Skipping seed.`);
      return;
    }

    console.log(`Seeding ${CONTRACTS_DATA.length} contracts...`);

    // Generate contract references
    const generateContractReference = (index: number) => {
      const year = new Date().getFullYear();
      const sequence = (index + 1).toString().padStart(3, '0');

      return `${sequence}-Cont${year}`;
    };

    // Create contracts
    for (let i = 0; i < CONTRACTS_DATA.length; i++) {
      const contractData = CONTRACTS_DATA[i];
      const company = companies[i % companies.length];
      const businessModel = businessModels[i % businessModels.length];
      const contractReference = generateContractReference(i);

      await Contract.create({
        contractReference,
        contractTitle: contractData.contractTitle,
        companyId: company.id,
        businessModelLookupId: businessModel.id,
        isActive: contractData.isActive,
        numberOfTeamLeaders: contractData.numberOfTeamLeaders,
        numberOfBranches: contractData.numberOfBranches,
        numberOfPreventiveTickets: contractData.numberOfPreventiveTickets,
        numberOfCorrectiveTickets: contractData.numberOfCorrectiveTickets,
        contractStartDate: contractData.contractStartDate,
        contractEndDate: contractData.contractEndDate,
        contractValue: contractData.contractValue,
        contractFiles: contractData.contractFiles,
        contractDescription: contractData.contractDescription,
      } as any);

      console.log(`Created contract: ${contractReference} - ${contractData.contractTitle}`);
    }

    console.log(`Successfully seeded ${CONTRACTS_DATA.length} contracts`);
  } catch (error) {
    console.error('Error seeding contracts:', error);
  } finally {
    await orm.sequelize.close();
  }
};

seedContracts();

