import { withDB } from "@/src/lib/utils/dbUtils";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";
import { processFormFile } from "@/src/lib/utils/uploadUtils";
import { deleteFileFromS3, handleFileUpload, listFilesFromS3 } from "@/src/lib/utils/awsUtils";

export const GET = withDB(async () => {
    try {
        const images = await listFilesFromS3('gallery');
        return sendSuccess({ images, message: 'Galleries fetched successfully' }, 200);
    } catch (error) {
        console.error('Error fetching galleries:', error);
        return sendError('Failed to fetch galleries: ' + error.message, 500);
    }
});

export const POST = withDB(async (req) => {
    try {
        const formData = await req.formData();
        const files = formData.getAll('image');
        const uploaded = [];

        for (const file of files) {
            const processed = await processFormFile(file);
            const filename = await handleFileUpload(processed, true);
            uploaded.push(filename);
        }

        return sendSuccess({ images: uploaded, message: 'Images uploaded successfully' }, 200);
    } catch (error) {
        return sendError('Failed to upload image: ' + error.message, 500);
    }
});

export const DELETE = withDB(async (req) => {
    try {
        const body = await req.json();
        const { imagePath } = body;

        await deleteFileFromS3(imagePath, true);
        return sendSuccess({ message: 'Image deleted successfully' });

    } catch (error) {
        return sendError('Failed to delete gallery' + error.message, 500);
    }
})