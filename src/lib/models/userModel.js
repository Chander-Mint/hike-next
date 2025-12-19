import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    role: { type: String, default: 'user', enum: ['admin', 'user', 'superAdmin'] },

    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },

}, { timestamps: true });

// module.exports = mongoose.models.User || mongoose.model('User', userSchema);
export default mongoose.models.User || mongoose.model('User', userSchema);