require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Import Agent model schema
const agentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: String,
    isAdmin: Boolean
});

// Register the model
const Agent = mongoose.model('Agent', agentSchema);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`[Agent Server] ${req.method} ${req.url}`);
    console.log('[Agent Server] Request body:', req.body);
    next();
});

// Simple test route
app.get('/test', (req, res) => {
    res.json({ message: 'Agent server is running!' });
});

// Login route
app.post('/login', async (req, res) => {
    console.log('[Agent Server] Login attempt:', req.body.email);
    try {
        const { email, password } = req.body;
        
        const agent = await Agent.findOne({ email });

        if (!agent) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, agent.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check status
        if (agent.status.toLowerCase() !== 'approved') {
            return res.status(403).json({
                success: false,
                message: `Your account is ${agent.status.toLowerCase()}. Please wait for admin approval.`
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: agent._id, role: 'agent' },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Success response
        const { password: _, ...agentInfo } = agent._doc;
        res.json({
            success: true,
            agent: agentInfo,
            token
        });

    } catch (error) {
        console.error('[Agent Server] Login error:', error);
        res.status(500).json({
            success: false,
            message: "Error during login",
            error: error.message
        });
    }
});

// Connect to MongoDB (using the same database)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('[Agent Server] Connected to database'))
.catch(err => {
    console.error('[Agent Server] Database connection error:', err);
    process.exit(1);
});

// Start server on port 5003
const PORT = 5003;
app.listen(PORT, () => {
    console.log(`[Agent Server] Running on port ${PORT}`);
    console.log('[Agent Server] Test URL: http://localhost:5003/test');
    console.log('[Agent Server] Login URL: http://localhost:5003/login');
});
