import 'reflect-metadata';
import { orm } from '../db/orm';
import { SubService } from '../db/models/sub-service.model';
import { SUB_SERVICES_DATA } from '../db/seeds/subServicesSeed';

const seedSubServices = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    const existingServices = await SubService.findAll();
    
    if (existingServices.length > 0) {
      console.log(`Found ${existingServices.length} existing sub services. Skipping seed.`);
      return;
    }

    console.log('Seeding sub services...');
    
    for (const serviceData of SUB_SERVICES_DATA) {
      await SubService.create(serviceData as any);
      console.log(`Created sub service: ${serviceData.name} for main service ${serviceData.mainServiceId}`);
    }

    console.log('Sub services seeded successfully!');
  } catch (error) {
    console.error('Error seeding sub services:', error);
  } finally {
    await orm.sequelize.close();
  }
};

seedSubServices();

