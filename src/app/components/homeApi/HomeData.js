import Testimonials from "@/src/lib/models/testimonialsModel";
import Events from "@/src/lib/models/eventModel";
import Blogs from "@/src/lib/models/blogModel";
import { listFilesFromS3 } from "@/src/lib/utils/awsUtils";

export const dynamic = 'force-dynamic';

export async function getHomeDataFromDB() {
    const event = await Events.find({ status: 'Active' }).select('title img slug').sort({ updatedAt: -1 }).limit(10);
    const upcomingEvents = event.length <= 7 ? event : event.slice(0, 7);
    const mainEvents = event.length <= 3 ? event : event.slice(-3);
    const testimonials = await Testimonials.find({ status: 'Active' });

    const blogs = await Blogs.find({ status: 'Published' }).select('title shortDescription img createdAt slug').sort({ updatedAt: -1 }).limit(4)

    // const blogs = await Blogs.aggregate([
    // { $sort: { updatedAt: -1 } },
    // { $limit: 3 },
    // {
    //     $project: {
    //         title: 1,
    //             shortDescription: 1,
    //                 img: 1,
    //                     createdAt: 1,
    //                         slug: 1,
    //         }
    // },
    // {
    //     $lookup: {
    //         from: 'comments',
    //             let: { blogId: '$_id' },
    //         pipeline: [
    //             {
    //                 $match: {
    //                     $expr: {
    //                         $and: [
    //                             { $eq: ['$commentableType', 'Blog'] },
    //                             { $eq: ['$commentableId', '$$blogId'] },
    //                             { $eq: ['$parentCommentId', null] }
    //                         ]
    //                     }
    //                 }
    //             },
    //             { $count: 'count' }
    //         ],
    //             as: 'commentData'
    //     }
    // }
    // ]);

    const images = await listFilesFromS3('gallery');

    return { mainEvents, blogs, upcomingEvents, testimonials, gallery: images };
}
