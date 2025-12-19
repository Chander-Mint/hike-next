import connectDB from '@/src/lib/db/connectDB';
import { sendError } from './responseUtils';

export const withDB = (handler) => async (req) => {
    try {
        await connectDB();
        return await handler(req);
    } catch (error) {
        console.error('Database connection error:', error);
        return sendError('Failed to connect to database', 500);
    }
};