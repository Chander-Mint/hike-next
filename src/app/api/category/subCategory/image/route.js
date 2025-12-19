import mongoose from 'mongoose';
import { withDB } from '@/src/lib/utils/dbUtils';
import categoryModel from '@/src/lib/models/categoryModel';
import { sendError, sendSuccess } from '@/src/lib/utils/responseUtils';
import { deleteFileFromS3 } from '@/src/lib/utils/awsUtils';

export const DELETE = withDB(async (req) => {
    try {
        const body = await req.json();
        const { subCategoryId, imageUrl } = body;

        if (!subCategoryId || !imageUrl) {
            return sendError('Subcategory ID and image URL are required', 400);
        }

        const category = await categoryModel.findOne({ 'subCategories._id': subCategoryId });

        if (!category) {
            return sendError('Subcategory not found', 404);
        }

        const subCategory = category.subCategories.id(subCategoryId);

        if (!subCategory) {
            return sendError('Subcategory not found in category', 404);
        }

        const newImages = subCategory.img.filter(img => img !== imageUrl);
        subCategory.img = newImages;

        await category.save();

        await deleteFileFromS3(imageUrl);

        return sendSuccess({ message: 'Image deleted successfully' }, 200);
    } catch (error) {
        console.error('Error deleting image:', error);
        return sendError('Failed to delete image: ' + error.message, 500);
    }
});
