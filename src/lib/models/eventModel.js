import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    itinerary: [{
        day: {
            type: Number,
            required: false,
        },
        title: {
            type: String,
            required: false,
            trim: true,
        },
        description: {
            type: String,
            required: false,
        },
    }],
    video: String,
    guideLines: [{
        title: {
            type: String,
            required: false,
            trim: true,
        },
        content: {
            type: String,
            required: false,
        }
    }],
    FAQs: [{
        question: {
            type: String,
            required: false,
            trim: true,
        },
        answer: {
            type: String,
            required: false,
        }
    }],
    policy: String,
    documents: [{
        imgUrl: String,
        header: String,
        pdfUrl: String,
        headerKey: String,
    }],
    inclusions: {
        type: [String],
        default: [],
    },
    exclusions: {
        type: [String],
        default: [],
    },
    basePrice: {
        type: Number,
        required: false,
    },
    duration: {
        type: String,
        required: false,
    },
    bestTime: String,
    maxElevation: String,
    activities: {
        type: [String],
        default: [],
    },
    route: String,
    difficulty: {
        type: String,
        // enum: ['Easy', 'Moderate', 'Difficult', 'Advanced'],
    },
    location: String,
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    subCategorySlug: {
        type: String,
        required: true,
        trim: true
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    }],
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    }
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
