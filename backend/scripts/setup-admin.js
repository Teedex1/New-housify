require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import the Admin model
const Admin = require('../api/models/Admin');

async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Check if admin exists
        const existingAdmin = await Admin.findOne({ email: 'admin@housify.com' });
        
        if (existingAdmin) {
            console.log('Admin account already exists');
            return;
        }

        // Create new admin
        const admin = new Admin({
            email: 'admin@housify.com',
            password: 'admin123456',
            firstName: 'Admin',
            lastName: 'User',
            isActive: true
        });

        await admin.save();
        console.log('Admin account created successfully');
        console.log('Email: admin@housify.com');
        console.log('Password: admin123456');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
