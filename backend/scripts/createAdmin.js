require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const Admin = require(path.join(__dirname, '..', 'api', 'models', 'Admin'));

const createAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        console.log('MongoDB URL:', process.env.MONGO_URL); // Add this for debugging
        
        // Connect to MongoDB with increased timeout
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
            socketTimeoutMS: 45000, // Increase socket timeout
        });

        console.log('Connected to MongoDB successfully');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@housify.com' });
        if (existingAdmin) {
            console.log('Admin account already exists');
            await mongoose.disconnect();
            process.exit(0);
        }

        // Create new admin
        const admin = new Admin({
            email: 'admin@housify.com',
            password: 'admin123456', // This will be hashed automatically
            firstName: 'Admin',
            lastName: 'User',
            isActive: true
        });

        await admin.save();
        console.log('Admin account created successfully');
        console.log('Email: admin@housify.com');
        console.log('Password: admin123456');
        console.log('Please change the password after first login');

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
};

createAdmin();
