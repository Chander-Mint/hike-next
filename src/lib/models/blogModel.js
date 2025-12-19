import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    slug: { type: String, required: true, unique: true },
    // author: String,
    bannerImg: { type: String, required: true },
    img: String,
    shortDescription: String,
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Published',
    }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);