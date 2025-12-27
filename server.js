require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth');
const equipmentRoutes = require('./routes/equipment');
const maintenanceRoutes = require('./routes/maintenance');
const teamsRoutes = require('./routes/teams');
const reportsRoutes = require('./routes/reports');
const workCentersRoutes = require('./routes/workcenters');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/workcenters', workCentersRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Check for required environment variables
if (!process.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET is not set in environment variables. Authentication will fail.');
    console.warn('Please create a .env file with JWT_SECRET=your_secret_key');
}

if (!process.env.MONGODB_URI) {
    console.warn('WARNING: MONGODB_URI is not set in environment variables.');
    console.warn('Please create a .env file with MONGODB_URI=your_mongodb_connection_string');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
