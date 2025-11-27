import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { orm } from '../db/orm';
import { User } from '../db/models/user.model';
import { UserRoles } from '../graphql/service/User/typedefs/User/enums/User.enums';

const createSuperAdmin = async () => {
  try {
    // Wait for database connection
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    const email = 'superadmin';
    const password = 'superadmin@123';
    const firstName = 'Super';
    const lastName = 'Admin';
    const userNumber = 'SUPER001';

    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { 
        email: email.toLowerCase() 
      } 
    });

    if (existingUser) {
      console.log(`User with email ${email} already exists. Updating password...`);
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Update the user
      await existingUser.update({ 
        password: hashedPassword,
        userRole: UserRoles.SUPER_ADMIN,
        firstName: firstName,
        lastName: lastName
      });
      
      console.log(`User updated successfully!`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
      console.log(`Role: ${UserRoles.SUPER_ADMIN}`);
    } else {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user
      const newUser = await User.create({
        id: uuidv4(),
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        userNumber: userNumber,
        userRole: UserRoles.SUPER_ADMIN,
        deviceId: 'web-browser-superadmin',
        fcmToken: 'web-fcm-superadmin',
      });

      console.log(`Super admin user created successfully!`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
      console.log(`Role: ${UserRoles.SUPER_ADMIN}`);
      console.log(`User ID: ${newUser.id}`);
    }

    // Close database connection
    await orm.sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating super admin:', error);
    await orm.sequelize.close();
    process.exit(1);
  }
};

createSuperAdmin();

