const mongoose = require('mongoose');

const workCenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    tag: {
        type: String
    },
    alternativeWorkcenters: {
        type: [String],
        default: []
    },
    costPerHour: {
        type: Number,
        default: 0
    },
    capacityTimeEfficiency: {
        type: Number,
        default: 100
    },
    oeeTarget: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WorkCenter', workCenterSchema);

