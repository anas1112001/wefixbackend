import 'reflect-metadata';
import { Branch } from '../db/models/branch.model';
import { Company } from '../db/models/company.model';
import { Lookup, LookupCategory } from '../db/models/lookup.model';
import { orm } from '../db/orm';
import { BRANCHES_DATA } from '../db/seeds/branchesSeed';

const seedBranches = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    // Get all companies
    const companies = await Company.findAll({ limit: 10 });
    if (companies.length === 0) {
      console.error('No companies found. Please seed companies first.');
      return;
    }

    // Get team leader lookup (USER_ROLE with code 'TEAMLEADER')
    const teamLeader = await Lookup.findOne({
      where: { category: LookupCategory.USER_ROLE, code: 'TEAMLEADER', isActive: true },
    });

    // Check if branches already exist
    const existingBranches = await Branch.count();
    if (existingBranches > 0) {
      console.log(`Branches already exist (${existingBranches} records). Skipping seed.`);
      return;
    }

    console.log(`Seeding ${BRANCHES_DATA.length} branches...`);

    // Create branches
    for (let i = 0; i < BRANCHES_DATA.length; i++) {
      const branchData = BRANCHES_DATA[i];
      const company = companies[i % companies.length];

      await Branch.create({
        branchTitle: branchData.branchTitle,
        branchNameArabic: branchData.branchNameArabic,
        branchNameEnglish: branchData.branchNameEnglish,
        branchRepresentativeName: branchData.branchRepresentativeName,
        representativeMobileNumber: branchData.representativeMobileNumber,
        representativeEmailAddress: branchData.representativeEmailAddress,
        companyId: company.id,
        teamLeaderLookupId: teamLeader?.id || null, // Use USER_ROLE with code 'TEAMLEADER'
        isActive: branchData.isActive,
      } as any);

      console.log(`Created branch: ${branchData.branchTitle} for company: ${company.companyNameEnglish || company.title}`);
    }

    console.log(`Successfully seeded ${BRANCHES_DATA.length} branches`);
  } catch (error) {
    console.error('Error seeding branches:', error);
  } finally {
    await orm.sequelize.close();
  }
};

seedBranches();

