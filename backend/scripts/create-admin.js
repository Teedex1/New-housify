require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const path = require('path');

// Wait for MongoDB connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

async function createAdmin() {
    try {
        console.log('Connecting to MongoDB...');
        console.log('MongoDB URL:', process.env.MONGO_URL);
        
        await mongoose.connect(process.env.MONGO_URL);
        
        // Only require the Admin model after connection is established
        const Admin = require(path.join(__dirname, '../api/models/Admin'));
        
        // Wait a bit to ensure indexes are created
        await new Promise(resolve => setTimeout(resolve, 2000));

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
        console.error('Error creating admin:', error);
        if (error.name === 'MongooseError') {
            console.error('MongoDB Connection Details:');
            console.error('URL:', process.env.MONGO_URL);
            console.error('Full error:', error.stack);
        }
    } finally {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
        } catch (err) {
            console.error('Error disconnecting:', err);
        }
        process.exit(0);
    }
}

createAdmin();
