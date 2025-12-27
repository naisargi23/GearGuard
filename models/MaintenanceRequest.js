const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'repaired', 'scrap'],
        default: 'new'
    },
    description: {
        type: String,
        required: true
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    submittedDate: {
        type: Date,
        default: Date.now
    },
    startDate: Date,
    completedDate: Date,
    timeElapsed: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

