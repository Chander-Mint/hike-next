import { withDB } from "@/src/lib/utils/dbUtils";
import Order from "@/src/lib/models/orderModel";
import Ticket from "@/src/lib/models/ticketModel";
import mongoose from "mongoose";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";
import userModel from "@/src/lib/models/userModel";
import eventModel from "@/src/lib/models/eventModel";

export const GET = withDB(async () => {
    try {
        const orders = await Order.find().populate('user', 'name email').lean();

        return sendSuccess({ orders, message: 'Orders fetched successfully' }, 200);
    } catch (error) {
        console.error('Error:', error);
        return sendError('Failed to fetch orders: ' + error.message, 500);
    }
});


export const POST = withDB(async (request) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { items, paymentMethod, shippingAddress, email, name } = await request.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            session.abortTransaction();
            session.endSession();
            return sendError({ message: 'No items provided' }, 400);
        }

        if (!paymentMethod || !shippingAddress || !email || !name) {
            session.abortTransaction();
            session.endSession();
            return sendError({ message: 'Payment method, shipping address, email and name are required' }, 400);
        }

        let totalAmount = 0;
        const validatedItems = [];

        for (const item of items) {
            const ticket = await Ticket.findById(item.ticketId).session(session);
            if (!ticket || ticket.status !== 'Available') {
                session.abortTransaction();
                session.endSession();
                return sendError({ message: `Ticket not available: ${item.ticketId}` }, 400);
            }

            const event = await eventModel.findOne({ slug: item?.event }).session(session);
            if (!event) {
                session.abortTransaction();
                session.endSession();
                return sendError({ message: `Event not found: ${item.event}` }, 400);
            }

            const itemTotal = ticket.price * item.quantity;
            totalAmount += itemTotal;

            validatedItems.push({
                ticketId: ticket._id,
                quantity: item.quantity,
                price: ticket.price,
                event: event.title
            });
        }

        const gst = totalAmount * 0.05;
        totalAmount += gst;
        totalAmount = Math.round(totalAmount);

        let user = await userModel.findOne({ email }).session(session);
        if (!user) {
            user = await userModel.create([{ email, name }], { session });
            user = user[0];
        }

        const order = await Order.create([{
            user: user._id,
            items: validatedItems,
            totalAmount,
            paymentStatus: 'Pending',
            paymentMethod,
            shippingAddress,
        }], { session });

        session.commitTransaction();

        return sendSuccess({ order, message: 'Order created successfully' }, 201);

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        return sendError(`Failed to create order: ${error.message}`, 500);
    }
})
