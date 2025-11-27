import 'reflect-metadata';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { orm } from '../db/orm';
import { Lookup, LookupCategory } from '../db/models/lookup.model';

const addOtherEstablishedType = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    // Check what established types exist
    const existingTypes = await Lookup.findAll({
      where: {
        category: LookupCategory.ESTABLISHED_TYPE,
        isActive: true,
      },
      order: [['orderId', 'ASC']],
    });

    console.log('\nExisting Established Types:');
    existingTypes.forEach((type) => {
      console.log(`  - ${type.name} (${type.nameArabic}) - ID: ${type.id}`);
    });

    // Check if "Other" exists by name
    const otherExists = existingTypes.find((t) => t.name.toLowerCase() === 'other');
    
    // Check if the ID already exists (might be inactive or different category)
    const idExists = await Lookup.findByPk('e5f6a7b8-c9d0-4123-e456-789012345678');

    if (otherExists) {
      console.log(`\n"Other" already exists with ID: ${otherExists.id}`);
      console.log(`  Name: ${otherExists.name}`);
      console.log(`  NameArabic: ${otherExists.nameArabic}`);
      console.log(`  IsActive: ${otherExists.isActive}`);
      console.log(`  Category: ${otherExists.category}`);
    } else {
      console.log('\n"Other" does not exist. Adding it now...');

      // Generate a new unique ID
      const newId = uuidv4();

      const newOther = {
        category: LookupCategory.ESTABLISHED_TYPE,
        code: null,
        description: 'Other',
        id: newId,
        isActive: true,
        isDefault: false,
        name: 'Other',
        nameArabic: 'أخرى',
        orderId: 9,
        parentLookupId: null,
      };

      await Lookup.create(newOther);
      console.log(`Successfully added "Other" (أخرى) with ID: ${newId}`);
    }

    // Verify it's there now (check case-insensitive)
    const verifyOther = await Lookup.findOne({
      where: {
        category: LookupCategory.ESTABLISHED_TYPE,
        name: { [Op.iLike]: 'other' },
      },
    });

    if (verifyOther) {
      console.log('\n✓ Verification: "Other" is now in the database');
      console.log(`  ID: ${verifyOther.id}`);
      console.log(`  Name: ${verifyOther.name}`);
      console.log(`  NameArabic: ${verifyOther.nameArabic}`);
      console.log(`  IsActive: ${verifyOther.isActive}`);
    } else {
      console.log('\n✗ Error: "Other" was not found after adding');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await orm.sequelize.close();
  }
};

// Run the script
addOtherEstablishedType()
  .then(() => {
    console.log('\nScript completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });

