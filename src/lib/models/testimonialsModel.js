import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
