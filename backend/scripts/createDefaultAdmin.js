require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../api/models/Admin');

if (!process.env.MONGO_URL) {
    console.error('MONGO_URL environment variable is not set');
    process.exit(1);
}

if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    process.exit(1);
}

async function createDefaultAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');

        // Check if admin exists
        const existingAdmin = await Admin.findOne({ email: 'admin@housify.com' });
        if (existingAdmin) {
            console.log('Admin account already exists');
            return;
        }

        // Create new admin
        const admin = new Admin({
            email: 'admin@housify.com',
            password: process.env.ADMIN_PASSWORD,
            firstName: 'Admin',
            lastName: 'User',
            isActive: true
        });

        await admin.save();
        console.log('Default admin account created successfully');
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Full error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from database');
    }
}

// Run the function
createDefaultAdmin();
