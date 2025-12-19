import categoryModel from '@/src/lib/models/categoryModel';
import { withDB } from '@/src/lib/utils/dbUtils';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { deleteFileFromS3, handleFileUpload } from '@/src/lib/utils/awsUtils';
import mongoose from 'mongoose';
import slugify from 'slugify';

export const GET = withDB(async (req) => {
    try {
        const { pathname } = req.nextUrl;
        const categoryId = pathname.split('/').pop();

        if (!categoryId) {
            return sendError('Category ID is required', 400);
        }

        const subCategory = await categoryModel.aggregate([
            { $unwind: '$subCategories' },
            {
                $match: {
                    'subCategories._id': new mongoose.Types.ObjectId(categoryId)
                }
            },
            {
                $project: {
                    _id: 0,
                    categoryId: '$_id',
                    categoryName: '$name',
                    categorySlug: '$slug',
                    subCategory: '$subCategories'
                }
            }
        ]);

        if (subCategory?.length === 0) {
            return sendError('Events not found', 404);
        }

        return sendSuccess({
            data: subCategory?.[0],
            message: 'Sub Category fetched successfully'
        }, 200);

    } catch (error) {
        console.error('Error fetching events:', error);
        return sendError('Failed to fetch events: ' + error.message, 500);
    }
})

export const POST = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { pathname } = request.nextUrl;
        const categoryId = pathname.split('/').pop();
        const formData = await request.formData();
        const title = formData.get('title');
        const status = formData.get('status');
        const img = formData.getAll('img');
        const bannerImg = formData.get('bannerImg');

        const category = await categoryModel.findById(categoryId);

        if (category.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Subcategory not found', 404);
        }

        const slugTitle = slugify(title, { lower: true, strict: true });

        const subCategoryToAdd = category?.[0]?.subCategories.find(sub => sub.slug.toString() === slugTitle);

        if (subCategoryToAdd) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Subcategory with this title already exists', 400);
        }

        if (!title || !status) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Title and status are required', 400);
        }

        if (!img || img.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Image is required', 400);
        }

        let images = [];

        if (img) {
            for (const i of img) {
                const processedFile = await processFormFile(i);
                const imagePath = await handleFileUpload(processedFile);
                images.push(imagePath);
            }
        }


        let bannerImgPath = null;

        if (bannerImg) {
            const processedFile = await processFormFile(bannerImg);
            const imagePath = await handleFileUpload(processedFile);

            bannerImgPath = imagePath;
        }

        const newSubCategory = {
            title: title,
            slug: slugify(title, { lower: true }),
            status: status,
            img: images,
            bannerImg: bannerImgPath
        };

        await categoryModel.updateOne(
            { _id: categoryId },
            { $push: { subCategories: newSubCategory } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();
        return sendSuccess({
            data: newSubCategory,
            message: 'Subcategory added successfully'
        }, 200);

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return sendError('Failed to update subcategory: ' + error.message, 500);
    }
})

export const PUT = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { pathname } = request.nextUrl;
        const categoryId = pathname.split('/').pop();
        const formData = await request.formData();
        const title = formData.get('title');
        const status = formData.get('status');
        const img = formData.getAll('img');
        const bannerImg = formData.get('bannerImg');

        const subCategory = await categoryModel.aggregate([
            {
                $match: {
                    "subCategories._id": new mongoose.Types.ObjectId(categoryId)
                }
            }
        ])

        if (subCategory.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Subcategory not found', 404);
        }

        const slugTitle = slugify(title, { lower: true, strict: true });

        const subCategoryToUpdate = subCategory[0].subCategories.find(sub => sub.slug.toString() === slugTitle);

        if (!subCategoryToUpdate) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Subcategory not found', 404);
        }

        if (title) {
            subCategoryToUpdate.title = title;
            subCategoryToUpdate.slug = slugify(title, { lower: true, strict: true });
        }

        if (status) {
            subCategoryToUpdate.status = status;
        }

        const allImagePath = [];
        if (img) {
            for (const i of img) {
                const processedFile = await processFormFile(i);
                const imagePath = await handleFileUpload(processedFile);
                allImagePath.push(imagePath);
            }

            if (allImagePath.length > 0) {
                subCategoryToUpdate.img = [...(subCategoryToUpdate.img || []), ...allImagePath];
            }
        }

        let bannerImgPath = null;

        if (bannerImg) {
            const processedFile = await processFormFile(bannerImg);
            const imagePath = await handleFileUpload(processedFile);

            bannerImgPath = imagePath;

            if (subCategoryToUpdate.bannerImg) {
                await deleteFileFromS3(subCategoryToUpdate.bannerImg);
            }

            subCategoryToUpdate.bannerImg = bannerImgPath;
        }

        await categoryModel.updateOne(
            { "subCategories._id": new mongoose.Types.ObjectId(categoryId) },
            { $set: { "subCategories.$": subCategoryToUpdate } }
        );

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ message: 'Subcategory updated successfully' }, 200);

    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error('Error updating category:', error);
        return sendError('Failed to update category: ' + error.message, 500);
    }
})

export const DELETE = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { pathname } = request.nextUrl;
        const categoryId = pathname.split('/').pop();

        if (!categoryId) {
            return sendError('Category ID is required', 400);
        }

        const subCategory = await categoryModel.aggregate([
            {
                $match: {
                    "subCategories._id": new mongoose.Types.ObjectId(categoryId)
                }
            }
        ])

        const subCategoryToDelete = subCategory[0].subCategories.find(sub => sub._id.toString() === categoryId);

        if (!subCategoryToDelete) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Subcategory not found', 404);
        }

        for (const i of subCategoryToDelete.img) {
            deleteFileFromS3(i);
        }

        await categoryModel.updateOne(
            { "subCategories._id": new mongoose.Types.ObjectId(categoryId) },
            { $pull: { subCategories: { _id: new mongoose.Types.ObjectId(categoryId) } } }
        );

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ message: 'Subcategory deleted successfully' }, 200);
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error('Error deleting category:', error);
        return sendError('Failed to delete category: ' + error.message, 500);
    }
})