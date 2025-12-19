import mongoose from 'mongoose';
import Testimonial from '@/src/lib/models/testimonialsModel';
import { withDB } from '@/src/lib/utils/dbUtils';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { deleteFileFromS3, handleFileUpload } from '@/src/lib/utils/awsUtils';

export const GET = withDB(async (req) => {
    try {
        const { pathname } = req.nextUrl;
        const id = pathname.split('/').pop();

        if (!id) {
            return sendError('Testimonial ID is required', 400);
        }

        const testimonial = await Testimonial.findById(id).lean();

        if (!testimonial) {
            return sendError('Testimonial not found', 404);
        }

        return sendSuccess({ testimonial, message: 'Testimonial fetched successfully' }, 200);
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
        const author = formData.get('author');
        const content = formData.get('content');
        const status = formData.get('status');
        const file = formData.get('image');

        if (!id) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Testimonial ID is required', 400);
        }

        const existingTestimonial = await Testimonial.findById(id).session(session);
        if (!existingTestimonial) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Testimonial not found', 404);
        }

        if (author) {
            existingTestimonial.author = author;
        }

        if (content) {
            existingTestimonial.content = content;
        }

        if (status) {
            existingTestimonial.status = status;
        }

        if (file) {
            if (existingTestimonial.image) {
                deleteFileFromS3(existingTestimonial.image);
            }
            const processedFile = await processFormFile(file);
            const imagePath = await handleFileUpload(processedFile);
            existingTestimonial.image = imagePath;
        }

        await existingTestimonial.save({ session });
        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ testimonial: existingTestimonial, message: 'Testimonial updated successfully' }, 200);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return sendError(error.message, 500);
    }
});