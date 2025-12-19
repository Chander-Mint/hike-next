import mongoose from 'mongoose';
// const mongoose = require('mongoose');


async function connectDB() {

    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
        // cachedConnection = conn;
        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to database');
    }
}

// module.exports = connectDB;
export default connectDB;