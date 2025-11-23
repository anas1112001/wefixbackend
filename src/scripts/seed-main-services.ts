import 'reflect-metadata';
import { orm } from '../db/orm';
import { MainService } from '../db/models/main-service.model';
import { MAIN_SERVICES_DATA } from '../db/seeds/mainServicesSeed';

const seedMainServices = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    const existingServices = await MainService.findAll();
    
    if (existingServices.length > 0) {
      console.log(`Found ${existingServices.length} existing main services. Skipping seed.`);
      return;
    }

    console.log('Seeding main services...');
    
    for (const serviceData of MAIN_SERVICES_DATA) {
      await MainService.create(serviceData as any);
      console.log(`Created main service: ${serviceData.name}`);
    }

    console.log('Main services seeded successfully!');
  } catch (error) {
    console.error('Error seeding main services:', error);
  } finally {
    await orm.sequelize.close();
  }
};

seedMainServices();

