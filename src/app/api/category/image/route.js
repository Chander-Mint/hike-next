import { withDB } from '@/src/lib/utils/dbUtils';
import { sendError, sendSuccess } from '@/src/lib/utils/responseUtils';
import mongoose from 'mongoose';
import Category from '@/src/lib/models/categoryModel';
import { deleteFileFromS3 } from '@/src/lib/utils/awsUtils';

export const DELETE = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const { categoryId, subCategoryId, imagePath } = await request.json();

        if (!categoryId || !subCategoryId || !imagePath) {
            await session.abortTransaction();
            session.endSession();
            return sendError('categoryId, subCategoryId, and imagePath are required', 400);
        }

        const category = await Category.findById(categoryId).session(session);

        if (!category) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Category not found', 404);
        }

        const subCategory = category.subCategories.id(subCategoryId);

        if (!subCategory) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Subcategory not found', 404);
        }

        if (!subCategory.img || !subCategory.img.includes(imagePath)) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Image not found in subcategory', 404);
        }

        if (subCategory.img.length === 1) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Cannot delete last image', 400);
        }

        const updatedImages = (subCategory.img || []).filter(path => path !== imagePath);

        if (updatedImages.length === subCategory.img.length) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Image not found in subcategory', 404);
        }

        subCategory.img = updatedImages;

        try {
            deleteFileFromS3(imagePath);
        } catch (err) {
            console.warn('File deletion failed:', err.message);
        }

        await category.save({ session });
        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ message: 'Image deleted successfully' }, 200);

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error deleting subcategory image:', error);
        return sendError('Failed to delete image: ' + error.message, 500);
    }
});
