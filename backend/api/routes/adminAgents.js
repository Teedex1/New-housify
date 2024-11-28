const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const { auth, isAdmin } = require('../middleware/auth');

// Get all agents (including pending, approved, and suspended)
router.get('/agents/all', auth, isAdmin, async (req, res) => {
  try {
    console.log('[AdminAgents] Fetching all agents...');
    console.log('[AdminAgents] User:', req.user); // Log the authenticated user
    
    const { status } = req.query;
    console.log('[AdminAgents] Status filter:', status);
    
    // Build query based on status filter
    const query = status ? { status } : {};
    console.log('[AdminAgents] MongoDB query:', query);
    
    const agents = await Agent.find(query)
      .select('-password')
      .sort({ createdAt: -1 });
      
    console.log(`[AdminAgents] Found ${agents.length} agents with status: ${status || 'all'}`);
    res.json({ success: true, agents });
  } catch (error) {
    console.error('[AdminAgents] Error fetching agents:', error);
    console.error('[AdminAgents] Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching agents',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get agent counts by status
router.get('/agents/counts', auth, isAdmin, async (req, res) => {
  try {
    console.log('[AdminAgents] Fetching agent counts...');
    console.log('[AdminAgents] User:', req.user);
    
    const counts = await Agent.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('[AdminAgents] Raw counts:', counts);
    
    const countsByStatus = counts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});
    
    const total = await Agent.countDocuments();
    console.log('[AdminAgents] Total agents:', total);
    console.log('[AdminAgents] Counts by status:', countsByStatus);
    
    res.json({ 
      success: true, 
      counts: {
        all: total,
        ...countsByStatus
      }
    });
  } catch (error) {
    console.error('[AdminAgents] Error fetching agent counts:', error);
    console.error('[AdminAgents] Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching agent counts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update agent status (approve, suspend, etc.)
router.put('/agents/:id/status', auth, isAdmin, async (req, res) => {
  try {
    console.log('[AdminAgents] Updating agent status...');
    console.log('[AdminAgents] User:', req.user);
    
    const { id } = req.params;
    console.log('[AdminAgents] Agent ID:', id);
    
    const { status } = req.body;
    console.log('[AdminAgents] New status:', status);
    
    if (!['pending', 'approved', 'suspended'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const agent = await Agent.findByIdAndUpdate(
      id,
      { status },
      { new: true, select: '-password' }
    );

    if (!agent) {
      console.log('[AdminAgents] Agent not found:', id);
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    console.log('[AdminAgents] Agent updated:', agent);
    res.json({ success: true, agent });
  } catch (error) {
    console.error('[AdminAgents] Error updating agent status:', error);
    console.error('[AdminAgents] Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating agent status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete agent
router.delete('/agents/:id', auth, isAdmin, async (req, res) => {
  try {
    console.log('[AdminAgents] Deleting agent...');
    console.log('[AdminAgents] User:', req.user);
    
    const { id } = req.params;
    console.log('[AdminAgents] Agent ID:', id);
    
    const agent = await Agent.findByIdAndDelete(id);

    if (!agent) {
      console.log('[AdminAgents] Agent not found:', id);
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    console.log('[AdminAgents] Agent deleted:', agent);
    res.json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('[AdminAgents] Error deleting agent:', error);
    console.error('[AdminAgents] Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting agent',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
