import mongoose from 'mongoose';
import Blog from '@/src/lib/models/blogModel';
import Comment from '@/src/lib/models/commentModel';
import { withDB } from '@/src/lib/utils/dbUtils';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { handleFileUpload, deleteFileFromS3 } from '@/src/lib/utils/awsUtils';
import slugify from 'slugify';

export const GET = withDB(async (req) => {
    try {
        const { pathname } = req.nextUrl;
        const id = pathname.split('/').pop();

        if (!id) {
            return sendError('Blog ID is required', 400);
        }

        const blog = await Blog.findById(id).lean();

        if (!blog) {
            return sendError('Blog not found', 404);
        }

        return sendSuccess({ blog, message: 'Blog fetched successfully' }, 200);
    } catch (error) {
        return sendError(error.message, 500);
    }
});

export const PATCH = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { pathname } = request.nextUrl;
        const id = pathname.split('/').pop();
        const formData = await request.formData();
        const title = formData.get('title');
        const content = formData.get('content');
        const shortDescription = formData.get('shortDescription');
        const bannerImg = formData.get('bannerImg');
        const img = formData.get('img');
        const status = formData.get('status');

        if (!id) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Blog ID is required', 400);
        }

        const existingBlog = await Blog.findById(id).session(session);
        if (!existingBlog) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Blog not found', 404);
        }

        if (title) {
            existingBlog.title = title;
        }

        if (content) {
            existingBlog.content = content;
        }

        if (shortDescription) {
            existingBlog.shortDescription = shortDescription;
        }

        if (bannerImg) {
            if (existingBlog.bannerImg) {
                deleteFileFromS3(existingBlog.bannerImg);
            }
            const processedBannerImg = await processFormFile(bannerImg);
            const bannerImgPath = await handleFileUpload(processedBannerImg);
            existingBlog.bannerImg = bannerImgPath;
        }

        if (img) {
            if (existingBlog.img) {
                deleteFileFromS3(existingBlog.img);
            }
            const processedImg = await processFormFile(img);
            const imgPath = await handleFileUpload(processedImg);
            existingBlog.img = imgPath;
        }

        if (status) {
            existingBlog.status = status;
        }

        existingBlog.slug = slugify(existingBlog.title, { lower: true });

        await existingBlog.save({ session });
        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ blog: existingBlog, message: 'Blog updated successfully' }, 200);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return sendError(error.message, 500);
    }
});

export const DELETE = withDB(async (req) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { pathname } = req.nextUrl;
        const id = pathname.split('/').pop();

        if (!id) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Blog ID is required', 400);
        }

        const existingBlog = await Blog.findById(id).session(session);
        if (!existingBlog) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Blog not found', 404);
        }

        if (existingBlog.bannerImg) {
            deleteFileFromS3(existingBlog.bannerImg);
        }
        if (existingBlog.img) {
            deleteFileFromS3(existingBlog.img);
        }

        await Comment.deleteMany({ blog: id }).session(session);

        await Blog.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ message: 'Blog and associated comments deleted successfully' }, 200);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return sendError(error.message, 500);
    }
});