import { withDB } from "@/src/lib/utils/dbUtils";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";
import { processFormFile } from "@/src/lib/utils/uploadUtils";
import { handleFileUpload } from "@/src/lib/utils/awsUtils";
import mongoose from "mongoose";

export const POST = withDB(async (request) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const formData = await request.formData();
        const file = formData.get('img');

        if (!file || file.size === 0) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Image file is required', 400);
        }

        const processedFile = await processFormFile(file);
        const imagePath = await handleFileUpload(processedFile);

        return sendSuccess({ imagePath }, 200);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return sendError('Failed to upload image: ' + error.message, 500);
    }

})