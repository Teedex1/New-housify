const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = 'mongodb+srv://Tunde1:Tunde1@cluster0.qhu9y.mongodb.net/housify?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function createAdmin() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

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

        console.log('Admin account created successfully:', result.insertedId);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

createAdmin();
