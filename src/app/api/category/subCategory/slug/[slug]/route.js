import categoryModel from '@/src/lib/models/categoryModel';
import Event from '@/src/lib/models/eventModel';
import Tickets from '@/src/lib/models/ticketModel';
import { withDB } from '@/src/lib/utils/dbUtils';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';

export const dynamic = 'force-dynamic';

export const GET = withDB(async (req) => {
    try {
        const { pathname } = req.nextUrl;
        const slug = pathname.split('/').pop();

        if (!slug) {
            return sendError('Category slug is required', 400);
        }

        const events = await Event.find({ 'subCategorySlug': slug, status: 'Active' }).populate('tickets').lean();

        const categoryDetails = await categoryModel.aggregate([
            { $unwind: "$subCategories" },
            {
                $match: {
                    "subCategories.slug": slug
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    subCategory: "$subCategories"
                }
            }
        ]);

        if (!events) {
            return sendError('Events not found', 404);
        }

        const eventsWithLatestTicketOnly = events.map(event => {

            const latestTicket = event.tickets
                .filter(ticket => new Date(ticket.startDate) > Date.now())
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];

            return {
                _id: event._id,
                title: event.title,
                slug: event.slug,
                description: event.description,
                img: event.img,
                location: event.location,
                latestTicket: latestTicket ? {
                    price: latestTicket.price,
                    startDate: latestTicket.startDate,
                    status: latestTicket.status,
                } : null
            };
        });

        return sendSuccess({
            data: {
                categoryDetails: categoryDetails[0],
                events: eventsWithLatestTicketOnly,
            },
            message: 'Events fetched successfully'
        }, 200);

    } catch (error) {
        console.error('Error fetching events:', error);
        return sendError('Failed to fetch events: ' + error.message, 500);
    }
})
