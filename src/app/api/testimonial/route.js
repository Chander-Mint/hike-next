import mongoose from 'mongoose';
import Testimonial from '@/src/lib/models/testimonialsModel';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { handleFileUpload } from '@/src/lib/utils/awsUtils';
import { withDB } from '@/src/lib/utils/dbUtils';

export const GET = withDB(async () => {
    try {

        const testimonials = await Testimonial.find().lean();
        return sendSuccess({ testimonials, message: 'Testimonials fetched successfully' }, 200);
    } catch (error) {
        console.error('Error:', error);
        return sendError('Failed to fetch testimonials: ' + error.message, 500);
    }
});

export const POST = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const formData = await request.formData();
        const author = formData.get('author');
        const content = formData.get('content');
        const status = formData.get('status');
        const file = formData.get('image');

        if (!author || !content || !file) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Author, content, and image are required', 400);
        }

        // Process image
        const processedFile = await processFormFile(file);
        const imagePath = await handleFileUpload(processedFile);

        const newTestimonial = new Testimonial({
            author,
            content,
            image: imagePath,
            status: status || 'Active',
        });

        await newTestimonial.save({ session });

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ testimonial: newTestimonial, message: 'Testimonial created successfully' }, 201);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error:', error);
        return sendError('Failed to create testimonial: ' + error.message, 500);
    }
});