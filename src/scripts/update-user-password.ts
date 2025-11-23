import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import { orm } from '../db/orm';
import { User } from '../db/models/user.model';

const updateUserPassword = async () => {
  try {
    // Wait for database connection
    await orm.sequelize.authenticate();
    console.log('Database connection established');

    const email = 'superadmin@wefix.com';
    const newPassword = 'Jadcom1100';

    // Find user by email
    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (!user) {
      console.error(`User with email ${email} not found`);
      process.exit(1);
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    await user.update({ password: hashedPassword });

    console.log(`Password successfully updated for user: ${email}`);
    console.log('New password:', newPassword);

    // Close database connection
    await orm.sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error updating password:', error);
    await orm.sequelize.close();
    process.exit(1);
  }
};

updateUserPassword();

