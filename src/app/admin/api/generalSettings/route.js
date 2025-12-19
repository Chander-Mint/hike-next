import mongoose from "mongoose";
import Settings from "@/src/lib/models/generalSettingsModel";
import { handleFileUpload } from "@/src/lib/utils/awsUtils";
import { withDB } from "@/src/lib/utils/dbUtils";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";
import { processFormFile } from "@/src/lib/utils/uploadUtils";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";

export const PATCH = withDB(async (request) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        if (!token || token.role !== "superAdmin") {
            await session.abortTransaction();
            session.endSession();
            return sendError("Forbidden – superAdmin only", 403);
        }

        const formData = await request.formData();

        const fields = {
            title: formData.get("title"),
            description: formData.get("description"),
            email: formData.get("email"),
            phoneNumber: formData.get("phoneNumber"),
            address: formData.get("address"),
            location: formData.get("location"),
            socialMedia: JSON.parse(formData.get("socialMedia") || "{}"),
            themeType: formData.get("themeType")
        };

        let logoUrl;
        const logoFile = formData.get("logo");

        if (logoFile && typeof logoFile === "object" && logoFile.size > 0) {
            const processedFile = await processFormFile(logoFile);
            logoUrl = await handleFileUpload(processedFile);
        }

        const existingSettings = await Settings.findOne().session(session);
        let updatedSettings;

        if (existingSettings) {
            Object.assign(existingSettings, fields);
            if (logoUrl) existingSettings.logo = logoUrl;
            updatedSettings = await existingSettings.save();
        } else {
            updatedSettings = await Settings.create(
                { ...fields, logo: logoUrl || "" },
                { session }
            );
        }

        await session.commitTransaction();
        session.endSession();

        revalidatePath('/');
        revalidatePath('/admin/settings');
        return sendSuccess({
            message: "Settings updated successfully",
            settings: updatedSettings,
        });
    } catch (error) {
        console.error("Error:", error);
        return sendError("Failed to update settings: " + error.message, 500);
    }
});