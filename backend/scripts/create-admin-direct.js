require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    const client = new MongoClient(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000,
    });

    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected successfully');

        const db = client.db('housify');
        const admins = db.collection('admins');

        // Check if admin exists
        const existingAdmin = await admins.findOne({ email: 'admin@housify.com' });
        if (existingAdmin) {
            console.log('Admin account already exists');
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123456', salt);

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

        console.log('Admin created successfully');
        console.log('Email: admin@housify.com');
        console.log('Password: admin123456');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

createAdmin();
