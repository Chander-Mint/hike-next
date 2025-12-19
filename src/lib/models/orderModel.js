import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            ticketId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ticket',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            },
            event: {
                type: String,
                required: true,
            },
        }
    ],

    totalAmount: {
        type: Number,
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },

    paymentMethod: {
        type: String,
        // enum: ['Card', 'UPI', 'NetBanking', 'COD'],
        required: true,
    },

    shippingAddress: {
        address: String,
        city: String,
        state: String,
        country: String,
        phoneNumber: String,
    },

    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
    },

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
