require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB successfully');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@housify.com' });
        
        if (existingAdmin) {
            console.log('Found existing admin:', existingAdmin.email);
            // Delete existing admin for fresh creation
            await Admin.deleteOne({ email: 'admin@housify.com' });
            console.log('Deleted existing admin account');
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
        console.log('Admin account created/updated successfully');
        console.log('Email:', admin.email);
        console.log('Password: admin123456');
        console.log('Please change the password after first login');

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

createAdmin();
