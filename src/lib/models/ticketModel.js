import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    availableSlots: {
        type: Boolean,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        // enum: ['Available', 'Sold Out', 'Cancelled'],
        default: 'Active',
    },
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);