const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const WorkCenter = require('../models/WorkCenter');

// Get all work centers
router.get('/', auth, async (req, res) => {
    try {
        const workCenters = await WorkCenter.find().sort({ createdAt: -1 });
        res.json({ success: true, workCenters });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single work center
router.get('/:id', auth, async (req, res) => {
    try {
        const workCenter = await WorkCenter.findById(req.params.id);
        if (!workCenter) {
            return res.status(404).json({ message: 'Work center not found' });
        }
        res.json({ success: true, workCenter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create work center
router.post('/', auth, async (req, res) => {
    try {
        const { name, code, tag, alternativeWorkcenters, costPerHour, capacityTimeEfficiency, oeeTarget } = req.body;
        const workCenter = new WorkCenter({
            name,
            code,
            tag,
            alternativeWorkcenters: alternativeWorkcenters || [],
            costPerHour: costPerHour || 0,
            capacityTimeEfficiency: capacityTimeEfficiency || 100,
            oeeTarget: oeeTarget || 0
        });
        await workCenter.save();
        res.json({ success: true, workCenter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update work center
router.put('/:id', auth, async (req, res) => {
    try {
        const workCenter = await WorkCenter.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!workCenter) {
            return res.status(404).json({ message: 'Work center not found' });
        }
        res.json({ success: true, workCenter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete work center
router.delete('/:id', auth, async (req, res) => {
    try {
        const workCenter = await WorkCenter.findByIdAndDelete(req.params.id);
        if (!workCenter) {
            return res.status(404).json({ message: 'Work center not found' });
        }
        res.json({ success: true, message: 'Work center deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

