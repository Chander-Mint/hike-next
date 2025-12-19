import mongoose from 'mongoose';
import { withDB } from "@/src/lib/utils/dbUtils";
import Blog from "@/src/lib/models/blogModel";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";

export const GET = withDB(async (req) => {
    try {
        const { pathname } = req.nextUrl;
        const slug = pathname.split('/').pop();

        if (!slug) {
            return sendError('Blog slug is required', 400);
        }

        const blog = await Blog.find({ slug }).lean();

        if (!blog) {
            return sendError('Blog not found', 404);
        }

        return sendSuccess({ blog, message: 'Blog fetched successfully' }, 200);
    } catch (error) {
        return sendError(error.message, 500);
    }
});