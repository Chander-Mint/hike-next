import Category from '@/src/lib/models/categoryModel';
import { withDB } from '@/src/lib/utils/dbUtils';
import { sendError, sendSuccess } from '@/src/lib/utils/responseUtils';

export const GET = withDB(async (req) => {
    try {
        const { pathname } = req.nextUrl;
        const slug = pathname.split('/').pop();

        if (!slug) {
            return sendError('Category Slug is required', 400);
        }

        const categories = await Category.find({ slug }).lean();

        if (!categories) {
            return sendError('Categories not found', 404);
        }

        return sendSuccess({ categories, message: 'Categories fetched successfully' }, 200);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return sendError('Failed to fetch categories: ' + error.message, 500);
    }
});