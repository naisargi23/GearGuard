const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const MaintenanceRequest = require('../models/MaintenanceRequest');

// Get all maintenance requests
router.get('/', auth, async (req, res) => {
    try {
        const { status, assignedTo } = req.query;
        let query = {};
        
        if (status) {
            query.status = status;
        }
        if (assignedTo) {
            query.assignedTo = assignedTo;
        }
        
        const requests = await MaintenanceRequest.find(query)
            .populate('submittedBy', 'username email')
            .populate('assignedTo', 'username email')
            .sort({ submittedDate: -1 });
        
        res.json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single request
router.get('/:id', auth, async (req, res) => {
    try {
        const request = await MaintenanceRequest.findById(req.params.id)
            .populate('submittedBy', 'username email')
            .populate('assignedTo', 'username email');
        
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json({ success: true, request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create maintenance request
router.post('/', auth, async (req, res) => {
    try {
        const { title, equipment, equipmentId, priority, description } = req.body;
        
        // Generate request ID
        const count = await MaintenanceRequest.countDocuments();
        const requestId = `#MR-${String(count + 1).padStart(3, '0')}`;
        
        const request = new MaintenanceRequest({
            requestId,
            title,
            equipment,
            equipmentId,
            priority,
            description,
            submittedBy: req.user.id,
            status: 'new'
        });
        
        await request.save();
        await request.populate('submittedBy', 'username email');
        
        res.json({ success: true, request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update maintenance request
router.put('/:id', auth, async (req, res) => {
    try {
        const { status, assignedTo, timeElapsed } = req.body;
        
        const updateData = {};
        if (status) updateData.status = status;
        if (assignedTo) updateData.assignedTo = assignedTo;
        if (timeElapsed) updateData.timeElapsed = timeElapsed;
        
        if (status === 'in-progress' && !updateData.startDate) {
            updateData.startDate = new Date();
        }
        if (status === 'repaired' && !updateData.completedDate) {
            updateData.completedDate = new Date();
        }
        
        const request = await MaintenanceRequest.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('submittedBy', 'username email')
         .populate('assignedTo', 'username email');
        
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        
        res.json({ success: true, request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete maintenance request
router.delete('/:id', auth, async (req, res) => {
    try {
        const request = await MaintenanceRequest.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json({ success: true, message: 'Request deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

