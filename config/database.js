const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('ERROR: MONGODB_URI is not set in environment variables');
            console.error('Please create a .env file with: MONGODB_URI=your_mongodb_connection_string');
            process.exit(1);
        }
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error.message);
        console.error('Please check your MONGODB_URI in the .env file');
        console.error('For local MongoDB, use: mongodb://localhost:27017/gearguard');
        process.exit(1);
    }
};

module.exports = connectDB;

