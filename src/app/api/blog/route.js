import mongoose from 'mongoose';
import Blog from '@/src/lib/models/blogModel';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { handleFileUpload } from '@/src/lib/utils/awsUtils';
import slugify from 'slugify';
import { withDB } from '@/src/lib/utils/dbUtils';

export const GET = withDB(async () => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
        return sendSuccess({ blogs, message: 'Blogs fetched successfully' }, 200);
    } catch (error) {
        console.error('Error:', error);
        return sendError('Failed to fetch blogs: ' + error.message, 500);
    }
});

export const POST = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const formData = await request.formData();
        const title = formData.get('title');
        const content = formData.get('content');
        const shortDescription = formData.get('shortDescription');
        const bannerImg = formData.get('bannerImg');
        const img = formData.get('img');
        const status = formData.get('status');

        if (!title || !bannerImg) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Title and banner image are required', 400);
        }

        const existingBlog = await Blog.findOne({ title }).session(session);
        if (existingBlog) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Blog with this title already exists', 400);
        }

        // Process banner image
        const processedBannerImg = await processFormFile(bannerImg);
        const bannerImgPath = await handleFileUpload(processedBannerImg);

        // Process optional image if provided
        let imgPath = null;
        if (img) {
            const processedImg = await processFormFile(img);
            imgPath = await handleFileUpload(processedImg);
        }

        const newBlog = new Blog({
            title,
            slug: slugify(title, { lower: true }),
            content,
            shortDescription,
            bannerImg: bannerImgPath,
            img: imgPath,
            status: status || 'Published',
        });

        await newBlog.save({ session });

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ blog: newBlog, message: 'Blog created successfully' }, 201);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error:', error);
        return sendError('Failed to create blog: ' + error.message, 500);
    }
});