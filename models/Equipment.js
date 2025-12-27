const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    department: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    },
    maintenanceCount: {
        type: Number,
        default: 0
    },
    purchaseDate: {
        type: Date
    },
    warrantyExpires: {
        type: Date
    },
    company: {
        type: String,
        default: 'My Company (San Francisco)'
    },
    technician: {
        type: String
    },
    usedBy: {
        type: String,
        default: 'Employee'
    },
    maintenanceTeam: {
        type: String
    },
    assignedDate: {
        type: Date
    },
    description: {
        type: String
    },
    scrapDate: {
        type: Date
    },
    usedInLocation: {
        type: String
    },
    workCenter: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Equipment', equipmentSchema);

