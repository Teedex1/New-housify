require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Admin = require('../api/models/Admin');

const MONGO_URL = 'mongodb+srv://Tunde1:Tunde1@cluster0.qhu9y.mongodb.net/housify?retryWrites=true&w=majority';

async function createDefaultAdmin() {
    let connection;
    try {
        // Connect to MongoDB
        connection = await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Check if admin exists
        const existingAdmin = await Admin.findOne({ email: 'admin@housify.com' });
        if (existingAdmin) {
            console.log('Admin account already exists');
            await mongoose.disconnect();
            return;
        }

        // Create new admin
        const admin = new Admin({
            email: 'admin@housify.com',
            password: 'admin123456', // This will be hashed by the pre-save hook
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
        // Close the connection
        if (connection) {
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
        }
    }
}

// Run the function
createDefaultAdmin();
