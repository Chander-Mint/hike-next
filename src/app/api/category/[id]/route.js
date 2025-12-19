import mongoose from 'mongoose';
import slugify from 'slugify';
import Category from '@/src/lib/models/categoryModel';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { deleteFileFromS3, handleFileUpload } from '@/src/lib/utils/awsUtils';
import { withDB } from '@/src/lib/utils/dbUtils';
import { sendError, sendSuccess } from '@/src/lib/utils/responseUtils';

export const GET = withDB(async (req) => {
    try {
        const { pathname } = req.nextUrl;
        const id = pathname.split('/').pop();

        if (!id) {
            return sendError('Category ID is required', 400);
        }

        const categories = await Category.findById(id).lean();

        if (!categories) {
            return sendError('Categories not found', 404);
        }

        return sendSuccess({ categories, message: 'Categories fetched successfully' }, 200);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return sendError('Failed to fetch categories: ' + error.message, 500);
    }
});

export const PATCH = withDB(async (request) => {

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { pathname } = request.nextUrl;
        const categoryId = pathname.split('/').pop();

        const formData = await request.formData();
        const name = formData.get('name');
        const status = formData.get('status');
        const categoryImg = formData.get('categoryImg');

        if (!categoryId) {
            return sendError('Category ID is required', 400);
        }

        const existingCategory = await Category.findById(categoryId).session(session);

        if (!existingCategory) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Category not found', 404);
        }

        if (name) {
            existingCategory.name = name;
            existingCategory.slug = slugify(name, { lower: true, strict: true });
        }

        if (status) {
            existingCategory.status = status;
        }

        if (categoryImg) {
            const processedFile = await processFormFile(categoryImg);
            const imagePath = await handleFileUpload(processedFile);

            const oldExistionImg = existingCategory.categoryImg

            if (oldExistionImg) {
                deleteFileFromS3(oldExistionImg);
            }

            existingCategory.categoryImg = imagePath;
        }

        await Category.updateOne(
            { _id: new mongoose.Types.ObjectId(categoryId) },
            { $set: existingCategory }
        );

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ category: existingCategory, message: 'Category updated successfully' }, 200);
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error('Error updating category:', error);
        return sendError('Failed to update category: ' + error.message, 500);
    }
});

export const DELETE = withDB(async (req) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { pathname } = req.nextUrl;
        const categoryId = pathname.split('/').pop();

        if (!categoryId) {
            return sendError('Category ID is required', 400);
        }

        const category = await Category.findById(categoryId).session(session);
        if (!category) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Category not found', 404);
        }

        if (category?.categoryImg) {
            deleteFileFromS3(category.categoryImg);
        }

        if (category?.subCategories?.length > 0) {
            for (const sub of category.subCategories) {
                for (const img of sub.img) {
                    if (img) {
                        deleteFileFromS3(img);
                    }
                }
            }
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId).session(session);
        if (!deletedCategory) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Category not found', 404);
        }

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ message: 'Category deleted successfully' }, 200);
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error('Error deleting category:', error);
        return sendError('Failed to delete category: ' + error.message, 500);
    }
});