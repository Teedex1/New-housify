require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const app = require('./api/app');  // Import the configured app from app.js

// Connect to MongoDB
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if (!process.env.MONGO_URL) {
    console.error('MONGO_URL environment variable is not set');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, mongoOptions)
    .then(() => console.log('Connected to database'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Frontend URL:', process.env.FRONTEND_URL || 'http://localhost:3000');
});
