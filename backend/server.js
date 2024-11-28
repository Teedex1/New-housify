require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Import routes
const adminRoutes = require('./api/routes/admin');
const agentRoutes = require('./api/routes/agentDashboard');
const adminAgentsRoutes = require('./api/routes/adminAgents');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

// Request logging
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
    });

    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request body:', JSON.stringify(req.body, null, 2));
    }
    if (req.headers.authorization) {
        console.log('Auth header present');
    }
    next();
});

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

// Routes
app.use('/api/admin', adminRoutes); // Login and admin profile routes
app.use('/api/admin/manage', adminAgentsRoutes); // Agent management routes
app.use('/api/agent', agentRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Frontend URL:', process.env.FRONTEND_URL || 'http://localhost:3000');
});
