const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function addAdmin() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('housify');
        const admins = db.collection('admins');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123456', salt);

        // Create admin
        await admins.insertOne({
            email: 'admin@housify.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Admin created successfully');
        console.log('Email: admin@housify.com');
        console.log('Password: admin123456');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

addAdmin();
