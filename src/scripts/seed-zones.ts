import 'reflect-metadata';
import { Zone } from '../db/models/zone.model';
import { Branch } from '../db/models/branch.model';
import { orm } from '../db/orm';
import { ZONES_DATA } from '../db/seeds/zonesSeed';

const seedZones = async () => {
  try {
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    // Get all branches
    const branches = await Branch.findAll({ limit: 10 });
    if (branches.length === 0) {
      console.error('No branches found. Please seed branches first.');
      return;
    }

    // Check if zones already exist
    const existingZones = await Zone.count();
    if (existingZones > 0) {
      console.log(`Zones already exist (${existingZones} records). Skipping seed.`);
      return;
    }

    console.log(`Seeding ${ZONES_DATA.length} zones...`);

    // Create zones
    for (let i = 0; i < ZONES_DATA.length; i++) {
      const zoneData = ZONES_DATA[i];
      const branch = branches[i % branches.length];

      await Zone.create({
        zoneTitle: zoneData.zoneTitle,
        zoneNumber: zoneData.zoneNumber,
        zoneDescription: zoneData.zoneDescription,
        branchId: branch.id,
        isActive: zoneData.isActive,
      } as any);

      console.log(`Created zone: ${zoneData.zoneTitle} for branch: ${branch.branchTitle}`);
    }

    console.log(`Successfully seeded ${ZONES_DATA.length} zones`);
  } catch (error) {
    console.error('Error seeding zones:', error);
  } finally {
    await orm.sequelize.close();
  }
};

seedZones();

