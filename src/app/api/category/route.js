import mongoose from 'mongoose';
import slugify from 'slugify';
import Category from '@/src/lib/models/categoryModel';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { handleFileUpload } from '@/src/lib/utils/awsUtils'
import { withDB } from '@/src/lib/utils/dbUtils';

export const GET = withDB(async () => {
    try {
        const categories = await Category.find().lean();
        return sendSuccess({ categories, message: 'Categories fetched successfully' }, 200);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return sendError('Failed to fetch categories: ' + error.message, 500);
    }
});

export const POST = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const formData = await request.formData();
        const name = formData.get('name');
        const categoryImg = formData.get('categoryImg');
        const status = formData.get('status') || 'Active';
        const subCategories = JSON.parse(formData.get('subCategories') || '[]');

        if (!name || !categoryImg) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Name and category image are required', 400);
        }

        const existingCategory = await Category.findOne({ name }).session(session);
        if (existingCategory) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Category with this name already exists', 400);
        }

        const processedFile = await processFormFile(categoryImg);
        const imagePath = await handleFileUpload(processedFile);

        const processedSubCategories = [];
        for (const sub of subCategories) {
            if (!sub.title) {
                await session.abortTransaction();
                session.endSession();
                return sendError('Each subcategory must have a title', 400);
            }

            const subFiles = formData.getAll(sub.title);
            const bannerImg = formData.get(`${sub.title}_banner`);
            if ((!subFiles || subFiles.length === 0) && !bannerImg) {
                await session.abortTransaction();
                session.endSession();
                return sendError(`Images not provided for subcategory "${sub.title}"`, 400);
            }

            const subImagePaths = [];
            for (const file of subFiles) {
                const processedSubFile = await processFormFile(file);
                const subImagePath = await handleFileUpload(processedSubFile);
                subImagePaths.push(subImagePath);
            }

            let newBannerImg = null;
            const processedBannerFile = await processFormFile(bannerImg);
            newBannerImg = await handleFileUpload(processedBannerFile);

            processedSubCategories.push({
                title: sub.title,
                slug: slugify(sub.title, { lower: true, strict: true }),
                img: subImagePaths,
                bannerImg: newBannerImg,
                status: sub.status || 'Active',
            });
        }

        // Create new category
        const newCategory = new Category({
            name,
            slug: slugify(name, { lower: true, strict: true }),
            categoryImg: imagePath,
            status,
            subCategories: processedSubCategories,
        });

        await newCategory.save({ session });

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ category: newCategory, message: 'Category and subcategories created successfully' }, 201);
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error('Error creating category:', error);
        return sendError('Failed to create category: ' + error.message, 500);
    }
});
