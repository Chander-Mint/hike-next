import { withDB } from "@/src/lib/utils/dbUtils";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";
import QueryModel from "@/src/lib/models/queryModel";
import mongoose from "mongoose";
import { sendQueryEmail } from "@/src/lib/utils/queryEmailUtils";

export const POST = withDB(async (req) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const data = await req.json();

        const { name, email, phoneNumber, message } = data;
        if (!name || !email || !phoneNumber || !message) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Name, Emial, Phone number and message are required:' + error.message, 500);
        }
        const query = new QueryModel({ name, email, phoneNumber, message });
        await query.save({ session });

        await sendQueryEmail({ name, email, phoneNumber, message });

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ message: 'Query sent successfully' }, 200);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return sendError('Failed to post a query request:' + error.message, 500);
    }
})

export const GET = withDB(async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get('page');
        const limit = searchParams.get('limit') || 10;

        const queries = await QueryModel.find().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 }).lean();

        if (!queries) {
            return sendError('No queries found', 404);
        }

        const total = await QueryModel.countDocuments();
        const totalPages = Math.ceil(total / limit);


        return sendSuccess({ data: queries, pagination: { page, limit, total, totalPages } }, 200);
    } catch (error) {
        return sendError('Failed to get queries:' + error.message, 500);
    }
})