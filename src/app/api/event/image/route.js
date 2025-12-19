import Event from "@/src/lib/models/eventModel";
import { deleteFileFromS3 } from "@/src/lib/utils/awsUtils";
import { withDB } from "@/src/lib/utils/dbUtils";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";
import mongoose from "mongoose";

export const DELETE = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const { eventId, imgUrl, pdfUrl } = await request.json();

        if (!eventId || !imgUrl || !pdfUrl) {
            await session.abortTransaction();
            session.endSession();
            return sendError('eventId, imgUrl, and pdfUrl are required', 400);
        }

        const event = await Event.findById(eventId).session(session);
        if (!event) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Event not found', 404);
        }

        const originalLength = event.documents.length;

        event.documents = event.documents.filter(doc => {
            const isTarget = doc.imgUrl === imgUrl && doc.pdfUrl === pdfUrl;
            if (isTarget) {
                try {
                    deleteFileFromS3(doc.imgUrl);
                    deleteFileFromS3(doc.pdfUrl);
                } catch (err) {
                    console.warn('File deletion failed:', err.message);
                }
            }
            return !isTarget;
        });

        if (event.documents.length === originalLength) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Document not found in event', 404);
        }

        await event.save({ session });
        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ message: 'Document deleted successfully' }, 200);

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Delete Document Error:', error);
        return sendError('Failed to delete document: ' + error.message, 500);
    }
});
