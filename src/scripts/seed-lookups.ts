import 'reflect-metadata';
import { orm } from '../db/orm';
import { Lookup } from '../db/models/lookup.model';
import { LOOKUP_DATA } from '../db/seeds/lookupsSeed';

const seedLookups = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    // Check if lookups already exist
    const existingLookups = await Lookup.count();

    if (existingLookups > 0) {
      console.log(`Found ${existingLookups} existing lookups. Skipping seed.`);
      console.log('To re-seed, please clear the lookups table first.');
      return;
    }

    console.log('Seeding lookups table...');

    // Insert all lookup data
    for (const lookup of LOOKUP_DATA) {
      await Lookup.create({
        category: lookup.category,
        code: lookup.code,
        description: lookup.description,
        id: lookup.id,
        isActive: lookup.isActive,
        isDefault: lookup.isDefault,
        name: lookup.name,
        nameArabic: lookup.nameArabic,
        orderId: lookup.orderId,
        parentLookupId: lookup.parentLookupId,
      });
    }

    console.log(`Successfully seeded ${LOOKUP_DATA.length} lookups:`);
    console.log(`  - ${LOOKUP_DATA.filter((l) => l.category === 'Country').length} Countries`);
    console.log(`  - ${LOOKUP_DATA.filter((l) => l.category === 'EstablishedType').length} Established Types`);
    console.log(`  - ${LOOKUP_DATA.filter((l) => l.category === 'UserRole').length} User Roles`);
    console.log(`  - ${LOOKUP_DATA.filter((l) => l.category === 'TeamLeader').length} Team Leaders`);
  } catch (error) {
    console.error('Error seeding lookups:', error);
    throw error;
  } finally {
    await orm.sequelize.close();
  }
};

// Run the seed
seedLookups()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });

