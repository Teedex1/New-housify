const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Property = require('../models/property');
const Lead = require('../models/lead');
const User = require('../models/user');

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
    try {
        const totalListings = await Property.countDocuments({ agent: req.user.id });
        const activeListings = await Property.countDocuments({ agent: req.user.id, status: 'active' });
        const viewsThisMonth = await Property.aggregate([
            { $match: { agent: req.user.id } },
            { $group: { _id: null, totalViews: { $sum: "$views" } } }
        ]);
        const leadsGenerated = await Lead.countDocuments({ agent: req.user.id });

        res.json({
            totalListings,
            activeListings,
            viewsThisMonth: viewsThisMonth[0]?.totalViews || 0,
            leadsGenerated
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get recent listings
router.get('/listings', auth, async (req, res) => {
    try {
        const listings = await Property.find({ agent: req.user.id })
            .sort({ createdAt: -1 })
            .limit(5);
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get recent leads
router.get('/leads', auth, async (req, res) => {
    try {
        const leads = await Lead.find({ agent: req.user.id })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('property', 'title');
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new property listing
router.post('/property', auth, async (req, res) => {
    try {
        const newProperty = new Property({
            ...req.body,
            agent: req.user.id,
            status: 'pending'
        });
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update property status
router.patch('/property/:id/status', auth, async (req, res) => {
    try {
        const property = await Property.findOneAndUpdate(
            { _id: req.params.id, agent: req.user.id },
            { status: req.body.status },
            { new: true }
        );
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all listings for an agent
router.get('/all-listings', auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const listings = await Property.find({ agent: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Property.countDocuments({ agent: req.user.id });

        res.json({
            listings,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all leads for an agent
router.get('/all-leads', auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const leads = await Lead.find({ agent: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('property', 'title');

        const total = await Lead.countDocuments({ agent: req.user.id });

        res.json({
            leads,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
