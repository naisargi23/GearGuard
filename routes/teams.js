const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Team = require('../models/Team');
const MaintenanceRequest = require('../models/MaintenanceRequest');

// Get all teams
router.get('/', auth, async (req, res) => {
    try {
        const teams = await Team.find().populate('members.userId', 'username email');
        
        // Calculate active requests for each team
        const teamsWithRequests = await Promise.all(teams.map(async (team) => {
            const memberIds = team.members.map(m => m.userId ? m.userId._id || m.userId : null).filter(id => id);
            let activeRequests = 0;
            
            if (memberIds.length > 0) {
                activeRequests = await MaintenanceRequest.countDocuments({
                    status: { $in: ['new', 'in-progress'] },
                    assignedTo: { $in: memberIds }
                });
            }
            
            const teamObj = team.toObject();
            teamObj.activeRequests = activeRequests;
            return teamObj;
        }));
        
        res.json({ success: true, teams: teamsWithRequests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single team
router.get('/:id', auth, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members.userId', 'username email');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({ success: true, team });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create team
router.post('/', auth, async (req, res) => {
    try {
        const { name, members } = req.body;
        const team = new Team({ name, members });
        await team.save();
        await team.populate('members.userId', 'username email');
        res.json({ success: true, team });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update team
router.put('/:id', auth, async (req, res) => {
    try {
        const { name, members } = req.body;
        const team = await Team.findByIdAndUpdate(
            req.params.id,
            { name, members },
            { new: true }
        ).populate('members.userId', 'username email');
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({ success: true, team });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete team
router.delete('/:id', auth, async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({ success: true, message: 'Team deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

