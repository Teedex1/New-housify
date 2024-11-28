const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Agent = require('../models/Agent');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header('Authorization');
        console.log('[Auth] Authorization header:', authHeader);
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('[Auth] No valid Authorization header found');
            return res.status(401).json({ 
                success: false,
                message: 'Authentication failed: No token provided' 
            });
        }

        const token = authHeader.split(' ')[1];
        console.log('[Auth] Token extracted:', token);

        // Verify JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            console.error('[Auth] JWT_SECRET is not set in environment variables');
            return res.status(500).json({ 
                success: false,
                message: 'Server configuration error' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('[Auth] Decoded token:', decoded);

        if (!decoded.id) {
            console.log('[Auth] No ID in decoded token');
            return res.status(401).json({ 
                success: false,
                message: 'Invalid token structure' 
            });
        }

        // Find user (try admin first, then agent, then regular user)
        let user = await Admin.findById(decoded.id);
        let role = 'admin';
        
        console.log('[Auth] Checking admin:', decoded.id, user ? 'found' : 'not found');

        if (!user) {
            user = await Agent.findById(decoded.id);
            role = 'agent';
            console.log('[Auth] Checking agent:', decoded.id, user ? 'found' : 'not found');
        }

        if (!user) {
            user = await User.findById(decoded.id);
            role = 'user';
            console.log('[Auth] Checking user:', decoded.id, user ? 'found' : 'not found');
        }

        if (!user) {
            console.log('[Auth] No user found with ID:', decoded.id);
            return res.status(401).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        // Add user and role to request
        req.user = user;
        req.userRole = role;
        console.log('[Auth] User authenticated:', { id: user._id, role });
        next();
    } catch (err) {
        console.error('[Auth] Error:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid token' 
            });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: 'Token expired' 
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error during authentication',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        console.log('[isAdmin] Checking admin privileges for user:', { 
            id: req.user?._id, 
            role: req.userRole,
            isActive: req.user?.isActive
        });
        
        if (!req.user) {
            console.log('[isAdmin] No user object in request');
            return res.status(401).json({ 
                success: false,
                message: 'Authentication required' 
            });
        }

        if (req.userRole !== 'admin') {
            console.log('[isAdmin] User is not an admin:', req.userRole);
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Admin privileges required.' 
            });
        }

        if (!req.user.isActive) {
            console.log('[isAdmin] Admin account is not active');
            return res.status(403).json({ 
                success: false,
                message: 'Admin account is not active' 
            });
        }

        console.log('[isAdmin] Admin access granted');
        next();
    } catch (error) {
        console.error('[isAdmin] Check error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during admin check',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const isAgent = async (req, res, next) => {
    try {
        console.log('[isAgent] Checking agent privileges for user:', { id: req.user._id, role: req.userRole });
        
        if (!req.user) {
            console.log('[isAgent] No user object in request');
            return res.status(401).json({ 
                success: false,
                message: 'Authentication required' 
            });
        }

        if (req.userRole !== 'agent' && req.userRole !== 'admin') {
            console.log('[isAgent] User lacks required role:', req.userRole);
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Agent privileges required.' 
            });
        }

        next();
    } catch (error) {
        console.error('[isAgent] Check error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during agent check',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    auth,
    isAdmin,
    isAgent
};
