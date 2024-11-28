require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admin@housify.com' });
    if (adminExists) {
      console.log('Admin account already exists!');
      process.exit(0);
    }

    // Create admin account
    const admin = new Admin({
      email: 'admin@housify.com',
      password: 'Admin@123',  // Change this immediately after first login
      name: 'Super Admin',
      role: 'super_admin'
    });

    await admin.save();
    console.log('Admin account created successfully!');
    console.log('Email: admin@housify.com');
    console.log('Password: Admin@123');
    console.log('IMPORTANT: Please change your password immediately after first login!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
