import 'reflect-metadata';
import { orm } from '../db/orm';
import { Lookup, LookupCategory } from '../db/models/lookup.model';

const seedAdditionalEstablishedTypes = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    // New facility types to add
    const newTypes = [
      {
        category: LookupCategory.ESTABLISHED_TYPE,
        code: null,
        description: 'Schools',
        id: 'a1b2c3d4-e5f6-4789-a012-345678901234',
        isActive: true,
        isDefault: false,
        name: 'Schools',
        nameArabic: 'مدارس',
        orderId: 5,
        parentLookupId: null,
      },
      {
        category: LookupCategory.ESTABLISHED_TYPE,
        code: null,
        description: 'Hospitals',
        id: 'b2c3d4e5-f6a7-4890-b123-456789012345',
        isActive: true,
        isDefault: false,
        name: 'Hospitals',
        nameArabic: 'مستشفيات',
        orderId: 6,
        parentLookupId: null,
      },
      {
        category: LookupCategory.ESTABLISHED_TYPE,
        code: null,
        description: 'Commercial Complex',
        id: 'c3d4e5f6-a7b8-4901-c234-567890123456',
        isActive: true,
        isDefault: false,
        name: 'Commercial Complex',
        nameArabic: 'مجمع تجاري',
        orderId: 7,
        parentLookupId: null,
      },
      {
        category: LookupCategory.ESTABLISHED_TYPE,
        code: null,
        description: 'Residential Complex',
        id: 'd4e5f6a7-b8c9-4012-d345-678901234567',
        isActive: true,
        isDefault: false,
        name: 'Residential Complex',
        nameArabic: 'مجمع سكني',
        orderId: 8,
        parentLookupId: null,
      },
      {
        category: LookupCategory.ESTABLISHED_TYPE,
        code: null,
        description: 'Other',
        id: 'e5f6a7b8-c9d0-4123-e456-789012345678',
        isActive: true,
        isDefault: false,
        name: 'Other',
        nameArabic: 'أخرى',
        orderId: 9,
        parentLookupId: null,
      },
    ];

    console.log('Adding new established types...');

    let addedCount = 0;
    let skippedCount = 0;

    for (const type of newTypes) {
      // Check if this type already exists by ID or name
      const existingById = await Lookup.findOne({
        where: {
          id: type.id,
        },
      });
      
      const existingByName = await Lookup.findOne({
        where: {
          category: LookupCategory.ESTABLISHED_TYPE,
          name: type.name,
        },
      });
      
      const existing = existingById || existingByName;

      if (existing) {
        console.log(`Skipping "${type.name}" - already exists`);
        skippedCount++;
      } else {
        await Lookup.create({
          category: type.category,
          code: type.code,
          description: type.description,
          id: type.id,
          isActive: type.isActive,
          isDefault: type.isDefault,
          name: type.name,
          nameArabic: type.nameArabic,
          orderId: type.orderId,
          parentLookupId: type.parentLookupId,
        });
        console.log(`Added "${type.name}" (${type.nameArabic})`);
        addedCount++;
      }
    }

    console.log(`\nSummary:`);
    console.log(`  - Added: ${addedCount} new types`);
    console.log(`  - Skipped: ${skippedCount} existing types`);
    console.log('Done!');
  } catch (error) {
    console.error('Error adding established types:', error);
    throw error;
  } finally {
    await orm.sequelize.close();
  }
};

// Run the script
seedAdditionalEstablishedTypes()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });

