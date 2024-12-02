const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const agentDashboardRoutes = require('./routes/agentDashboard');
const agentRoutes = require('./routes/agents');
const propertiesRoute = require('./routes/properties');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Test routes
app.get('/api/test', (req, res) => {
  console.log('Test GET route hit');
  res.json({ message: 'GET route is working!' });
});

app.post('/api/test', (req, res) => {
  console.log('Test POST route hit');
  res.json({ message: 'POST route is working!', body: req.body });
});

// Test agent route
app.post('/api/agent/test', (req, res) => {
  console.log('Agent test route hit');
  res.json({ message: 'Agent route is working!', body: req.body });
});

// Routes - Note the order matters!
app.use('/api/agent/dashboard', agentDashboardRoutes);  // More specific route first
app.use('/api/agents', agentRoutes);  // Then the more general route
app.use('/api/properties', propertiesRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body
  });
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// 404 handler - should be last
app.use((req, res) => {
  console.log('404 Not Found:', req.url);
  res.status(404).json({ message: `Route ${req.url} not found` });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available routes:');
  console.log('- GET /api/test');
  console.log('- POST /api/test');
  console.log('- POST /api/agent/test');
  console.log('- /api/agent/dashboard/*');
  console.log('- /api/agents/*');
  console.log('- /api/properties/*');
});

module.exports = app;
