import mongoose from 'mongoose';

const generalSettingsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },

    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },

    socialMedia: {
        facebook: { type: String, required: true },
        instagram: { type: String, required: true },
        twitter: { type: String, required: true },
        linkedin: { type: String, required: true },
        youtube: { type: String, required: true },
    },

    themeType: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 1,
    },

    // location: { type: String, required: true },
    // favicon: { type: String, required: true },

    // copyright: String
}, { timestamps: true });

export default mongoose.models.Setting || mongoose.model('Setting', generalSettingsSchema);