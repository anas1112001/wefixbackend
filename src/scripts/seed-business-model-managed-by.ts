import 'reflect-metadata';
import { orm } from '../db/orm';
import { Lookup, LookupCategory } from '../db/models/lookup.model';
import { BUSINESS_MODELS, MANAGED_BY } from '../db/seeds/lookupsSeed';

const seedBusinessModelAndManagedBy = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    // Check if Business Model lookups exist
    const existingBusinessModels = await Lookup.count({ where: { category: LookupCategory.BUSINESS_MODEL } });
    const existingManagedBy = await Lookup.count({ where: { category: LookupCategory.MANAGED_BY } });

    if (existingBusinessModels > 0 && existingManagedBy > 0) {
      console.log(`Found ${existingBusinessModels} Business Models and ${existingManagedBy} Managed By lookups. Skipping seed.`);
      return;
    }

    console.log('Seeding Business Model and Managed By lookups...');

    // Insert Business Models if they don't exist
    if (existingBusinessModels === 0) {
      for (const lookup of BUSINESS_MODELS) {
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
      console.log(`Successfully seeded ${BUSINESS_MODELS.length} Business Models`);
    }

    // Insert Managed By if they don't exist
    if (existingManagedBy === 0) {
      for (const lookup of MANAGED_BY) {
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
      console.log(`Successfully seeded ${MANAGED_BY.length} Managed By lookups`);
    }
  } catch (error) {
    console.error('Error seeding lookups:', error);
    throw error;
  } finally {
    await orm.sequelize.close();
  }
};

// Run the seed
seedBusinessModelAndManagedBy()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });

