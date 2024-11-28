require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const adminRoutes = require('./api/routes/admin');
const agentRoutes = require('./api/routes/agentDashboard');
const adminAgentsRoutes = require('./api/routes/adminAgents');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Error logging middleware
app.use((req, res, next) => {
    const oldSend = res.send;
    res.send = function (data) {
        console.log(`[${new Date().toISOString()}] Response for ${req.method} ${req.url}:`, data);
        oldSend.apply(res, arguments);
    };
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request body:', req.body);
    }
    if (req.headers.authorization) {
        console.log('Auth header present');
    }
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/admin', adminRoutes); // Login and admin profile routes
app.use('/api/admin/manage', adminAgentsRoutes); // Agent management routes
app.use('/api/agent', agentRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend URL: http://localhost:3000`);
    console.log(`API URL: http://localhost:${PORT}`);
});
