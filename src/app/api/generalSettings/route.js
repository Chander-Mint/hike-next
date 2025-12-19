import Settings from "@/src/lib/models/generalSettingsModel";
import { withDB } from "@/src/lib/utils/dbUtils";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";

export const dynamic = 'force-dynamic';

export const GET = withDB(async () => {
    try {
        const settings = await Settings.findOne().select('-__v -_id').lean();
        return sendSuccess({ settings: settings || {} });
    } catch (error) {
        console.error("Error:", error);
        return sendError("Failed to fetch settings: " + error.message, 500);
    }
});
