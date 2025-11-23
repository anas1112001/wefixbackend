import 'reflect-metadata';
import { QueryTypes } from 'sequelize';
import { Company } from '../db/models/company.model';
import { Lookup, LookupCategory } from '../db/models/lookup.model';
import { orm } from '../db/orm';
import { COMPANIES_DATA } from '../db/seeds/companiesSeed';
import { CompanyStatus } from '../graphql/service/Company/typedefs/Company/enums/Company.enums';

const seedCompanies = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    // Get country lookups
    const countries = await Lookup.findAll({
      where: { category: LookupCategory.COUNTRY, isActive: true },
    });
    if (countries.length === 0) {
      console.error('No countries found. Please seed lookups first.');
      return;
    }

    // Get established type lookups
    const establishedTypes = await Lookup.findAll({
      where: { category: LookupCategory.ESTABLISHED_TYPE, isActive: true },
    });
    if (establishedTypes.length === 0) {
      console.error('No established types found. Please seed lookups first.');
      return;
    }

    // Check if companies already exist
    const existingCompanies = await Company.count();
    if (existingCompanies > 0) {
      console.log(`Companies already exist (${existingCompanies} records).`);
      console.log('Proceeding to seed contracts...');
    } else {
      console.log(`Seeding ${COMPANIES_DATA.length} companies...`);

      // Create companies
      let createdCount = 0;
      for (let i = 0; i < COMPANIES_DATA.length; i++) {
        const companyData = COMPANIES_DATA[i];
        
        try {
          // Check if company with this companyId already exists
          const existing = await Company.findOne({ where: { companyId: companyData.companyId } });
          if (existing) {
            console.log(`Company ${companyData.companyId} already exists. Skipping.`);
            continue;
          }
          
          // Assign country and established type in round-robin fashion
          const country = countries[i % countries.length];
          const establishedType = establishedTypes[i % establishedTypes.length];

          // Use raw query to set both old and new columns
          await orm.sequelize.query(`
            INSERT INTO companies (
              id, company_id, title, company_name_arabic, company_name_english,
              country_lookup_id, established_type_lookup_id, established_type,
              ho_address, ho_location, is_active, number_of_branches, logo,
              created_at, updated_at
            ) VALUES (
              gen_random_uuid(), :companyId, :title, :companyNameArabic, :companyNameEnglish,
              :countryLookupId, :establishedTypeLookupId, 'LLC',
              :hoAddress, :hoLocation, :isActive, :numberOfBranches, :logo,
              NOW(), NOW()
            )
          `, {
            replacements: {
              companyId: companyData.companyId,
              title: companyData.title.toLowerCase(),
              companyNameArabic: companyData.companyNameArabic,
              companyNameEnglish: companyData.companyNameEnglish,
              countryLookupId: country.id,
              establishedTypeLookupId: establishedType.id,
              hoAddress: companyData.hoAddress,
              hoLocation: companyData.hoLocation,
              isActive: companyData.isActive ? 'Active' : 'Inactive',
              numberOfBranches: companyData.numberOfBranches,
              logo: companyData.logo,
            },
            type: QueryTypes.INSERT,
          });

          console.log(`Created company: ${companyData.title} (${companyData.companyId})`);
          createdCount++;
        } catch (error: any) {
          console.error(`Error creating company ${companyData.companyId}:`, error.message);
        }
      }

      console.log(`Successfully seeded ${createdCount} companies`);
    }
  } catch (error) {
    console.error('Error seeding companies:', error);
  } finally {
    await orm.sequelize.close();
  }
};

seedCompanies();

