const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

if (!process.env.MONGO_URL) {
    console.error('MONGO_URL environment variable is not set');
    process.exit(1);
}

if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    process.exit(1);
}

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function createAdmin() {
    try {
        await client.connect();
        console.log('Connected to database');

        const db = client.db(process.env.DB_NAME);
        const admins = db.collection(process.env.ADMIN_COLLECTION);

        // Check if admin exists
        const existingAdmin = await admins.findOne({ email: 'admin@housify.com' });
        if (existingAdmin) {
            console.log('Admin account already exists');
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

        // Create admin
        const result = await admins.insertOne({
            email: 'admin@housify.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Admin account created successfully:', result.insertedId);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from database');
    }
}

createAdmin();
