const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Agent = require('../models/Agent');
const { auth, isAdmin } = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find admin by email
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if admin is active
        if (!admin.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        // Verify password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = admin.generateAuthToken();
        
        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        res.json({
            success: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                firstName: admin.firstName,
                lastName: admin.lastName,
                isActive: admin.isActive,
                lastLogin: admin.lastLogin
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/admin/me
// @desc    Get admin profile
// @access  Private
router.get('/me', [auth, isAdmin], async (req, res) => {
    try {
        console.log('[Admin Profile] Fetching profile for admin:', req.user._id);
        const admin = await Admin.findById(req.user.id).select('-password');
        if (!admin) {
            console.log('[Admin Profile] Admin not found:', req.user._id);
            return res.status(404).json({ 
                success: false,
                message: 'Admin not found' 
            });
        }
        res.json({ success: true, admin });
    } catch (error) {
        console.error('[Admin Profile] Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/admin/manage/agents/counts
// @desc    Get agent counts by status
// @access  Private
router.get('/manage/agents/counts', [auth, isAdmin], async (req, res) => {
    try {
        console.log('[Agent Counts] Fetching agent counts');
        const [total, pending, approved, rejected] = await Promise.all([
            Agent.countDocuments(),
            Agent.countDocuments({ status: 'pending' }),
            Agent.countDocuments({ status: 'approved' }),
            Agent.countDocuments({ status: 'rejected' })
        ]);

        res.json({
            success: true,
            counts: {
                total,
                pending,
                approved,
                rejected
            }
        });
    } catch (error) {
        console.error('[Agent Counts] Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch agent counts',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/admin/manage/agents/all
// @desc    Get all agents with optional status filter
// @access  Private
router.get('/manage/agents/all', [auth, isAdmin], async (req, res) => {
    try {
        console.log('[Manage Agents] Fetching agents');
        const { status } = req.query;
        
        let query = {};
        if (status && status !== 'all') {
            query.status = status;
        }

        const agents = await Agent.find(query)
            .select('-password')
            .sort({ createdAt: -1 });

        console.log(`[Manage Agents] Found ${agents.length} agents`);
        res.json({
            success: true,
            agents
        });
    } catch (error) {
        console.error('[Manage Agents] Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch agents',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/admin/agents/stats
// @desc    Get agent statistics
// @access  Private
router.get('/agents/stats', [auth, isAdmin], async (req, res) => {
    try {
        console.log('[Agent Stats] Fetching agent statistics');
        const [total, pending, approved, rejected] = await Promise.all([
            Agent.countDocuments(),
            Agent.countDocuments({ status: 'pending' }),
            Agent.countDocuments({ status: 'approved' }),
            Agent.countDocuments({ status: 'rejected' })
        ]);

        res.json({
            success: true,
            stats: {
                total,
                pending,
                approved,
                rejected
            }
        });
    } catch (error) {
        console.error('[Agent Stats] Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/admin/agents/pending
// @desc    Get pending agent applications
// @access  Private
router.get('/agents/pending', [auth, isAdmin], async (req, res) => {
    try {
        const pendingAgents = await Agent.find({ status: 'pending' })
            .select('-password')
            .sort({ createdAt: -1 });
        res.json(pendingAgents);
    } catch (error) {
        console.error('Get pending agents error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   PUT /api/admin/manage/agents/:id/status
// @desc    Update agent status
// @access  Private
router.put('/manage/agents/:id/status', [auth, isAdmin], async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;

        console.log(`[Manage Agents] Updating agent ${id} status to ${status}`);

        const agent = await Agent.findById(id);
        if (!agent) {
            return res.status(404).json({
                success: false,
                message: 'Agent not found'
            });
        }

        agent.status = status;
        if (reason) {
            agent.statusReason = reason;
        }
        agent.updatedAt = new Date();
        await agent.save();

        console.log(`[Manage Agents] Successfully updated agent ${id} status`);
        res.json({
            success: true,
            agent: {
                id: agent._id,
                email: agent.email,
                firstName: agent.firstName,
                lastName: agent.lastName,
                status: agent.status,
                statusReason: agent.statusReason,
                updatedAt: agent.updatedAt
            }
        });
    } catch (error) {
        console.error('[Manage Agents] Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update agent status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   PUT /api/admin/agents/:id/status
// @desc    Update agent status (approve/reject)
// @access  Private
router.put('/agents/:id/status', [auth, isAdmin], async (req, res) => {
    try {
        const { status, reason } = req.body;
        
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid status' 
            });
        }

        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ 
                success: false,
                message: 'Agent not found' 
            });
        }

        agent.status = status;
        agent.statusReason = reason || '';
        agent.statusUpdatedAt = Date.now();
        agent.statusUpdatedBy = req.user.id;

        await agent.save();

        res.json({ 
            success: true,
            message: `Agent ${status} successfully`, 
            agent 
        });
    } catch (error) {
        console.error('Update agent status error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   DELETE /api/admin/manage/agents/:id
// @desc    Delete an agent
// @access  Private/Admin
router.delete('/manage/agents/:id', [auth, isAdmin], async (req, res) => {
    try {
        console.log('[Delete Agent] Attempting to delete agent:', req.params.id);
        
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            console.log('[Delete Agent] Agent not found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Agent not found'
            });
        }

        // Delete associated files if they exist
        if (agent.profilePhoto) {
            try {
                fs.unlinkSync(agent.profilePhoto);
            } catch (err) {
                console.error('[Delete Agent] Error deleting profile photo:', err);
            }
        }
        if (agent.idDocument) {
            try {
                fs.unlinkSync(agent.idDocument);
            } catch (err) {
                console.error('[Delete Agent] Error deleting ID document:', err);
            }
        }
        if (agent.licenseDocument) {
            try {
                fs.unlinkSync(agent.licenseDocument);
            } catch (err) {
                console.error('[Delete Agent] Error deleting license document:', err);
            }
        }

        await agent.deleteOne();
        console.log('[Delete Agent] Agent deleted successfully:', req.params.id);

        res.json({
            success: true,
            message: 'Agent deleted successfully'
        });
    } catch (error) {
        console.error('[Delete Agent] Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete agent',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
