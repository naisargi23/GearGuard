const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Equipment = require('../models/Equipment');

// Get all equipment
router.get('/', auth, async (req, res) => {
    try {
        const equipment = await Equipment.find().sort({ createdAt: -1 });
        res.json({ success: true, equipment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single equipment
router.get('/:id', auth, async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.json({ success: true, equipment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create equipment
router.post('/', auth, async (req, res) => {
    try {
        const { 
            name, category, serialNumber, department, assignedTo, location, team, 
            purchaseDate, warrantyExpires, company, technician, usedBy, maintenanceTeam,
            assignedDate, description, scrapDate, usedInLocation, workCenter, employee
        } = req.body;
        const equipment = new Equipment({
            name,
            category,
            serialNumber: serialNumber || `EQ-${Date.now()}`,
            department: department || 'General',
            assignedTo: assignedTo || employee || 'Unassigned',
            location: location || usedInLocation || 'Not specified',
            team: team || maintenanceTeam || 'General',
            purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
            warrantyExpires: warrantyExpires ? new Date(warrantyExpires) : null,
            company: company || 'My Company (San Francisco)',
            technician: technician || null,
            usedBy: usedBy || 'Employee',
            maintenanceTeam: maintenanceTeam || null,
            assignedDate: assignedDate ? new Date(assignedDate) : null,
            description: description || null,
            scrapDate: scrapDate ? new Date(scrapDate) : null,
            usedInLocation: usedInLocation || null,
            workCenter: workCenter || null
        });
        await equipment.save();
        res.json({ success: true, equipment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update equipment
router.put('/:id', auth, async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.json({ success: true, equipment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete equipment
router.delete('/:id', auth, async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.json({ success: true, message: 'Equipment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
