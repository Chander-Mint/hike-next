import Testimonials from "@/src/lib/models/testimonialsModel";
import Events from "@/src/lib/models/eventModel";
import Blogs from "@/src/lib/models/blogModel";
import { withDB } from "@/src/lib/utils/dbUtils";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";
import { listFilesFromS3 } from "@/src/lib/utils/awsUtils";

export const dynamic = 'force-dynamic';

export const GET = withDB(async () => {
    try {
        const event = await Events.find().select('title img slug').sort({ updatedAt: -1 }).limit(10)
        const upcomingEvents = event.length <= 7 ? event : event.slice(0, 7);
        const mainEvents = event.length <= 3 ? event : event.slice(-3);
        const testimonials = await Testimonials.find({});

        const blogs = await Blogs.find().select('title shortDescription img createdAt slug').sort({ updatedAt: -1 }).limit(10)

        const images = await listFilesFromS3('gallery');


        return sendSuccess({ data: { mainEvents, blogs, upcomingEvents, testimonials, gallery: images }, message: 'Data fetched successfully' }, 200);

    } catch (error) {
        console.error('Error:', error);
        return sendError('Failed to fetch testimonials:' + error.message, 500);
    }
})