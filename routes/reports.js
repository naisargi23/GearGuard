const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const MaintenanceRequest = require('../models/MaintenanceRequest');
const Equipment = require('../models/Equipment');
const Team = require('../models/Team');

// Get reports data
router.get('/', auth, async (req, res) => {
    try {
        // Requests by Team
        const teams = await Team.find();
        const requestsByTeam = [];
        for (let team of teams) {
            const count = await MaintenanceRequest.countDocuments({
                assignedTo: { $in: team.members.map(m => m.userId) }
            });
            requestsByTeam.push({ team: team.name, count });
        }
        
        // Requests by Status
        const requestsByStatus = await MaintenanceRequest.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        
        // Request Types (Corrective vs Preventive)
        const requestTypes = await MaintenanceRequest.aggregate([
            { $group: { _id: '$priority', count: { $sum: 1 } } }
        ]);
        
        res.json({
            success: true,
            data: {
                requestsByTeam,
                requestsByStatus,
                requestTypes
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

