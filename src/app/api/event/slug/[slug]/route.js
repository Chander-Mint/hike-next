import Comment from '@/src/lib/models/commentModel';
import Event from '@/src/lib/models/eventModel';
import Ticket from '@/src/lib/models/ticketModel';
import { withDB } from '@/src/lib/utils/dbUtils';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';

export const dynamic = 'force-dynamic';

export const GET = withDB(async (req) => {
    try {

        const { pathname } = req.nextUrl;
        const slug = pathname.split('/').pop();
        if (!slug) {
            return sendError('Event Slug is required', 400);
        }

        const events = await Event.find({ slug, status: 'Active' }).populate('tickets').lean();
        const event = events[0]

        const comments = await Comment.find({ commentableId: event._id, parentCommentId: null })
            .populate('replies')
            .sort({ createdAt: -1 })
            .lean();

        event.comments = comments

        if (!events) {
            return sendError('Event not found', 404);
        }

        return sendSuccess({ events, message: 'Event fetched successfully' }, 200);
    } catch (error) {
        return sendError(error.message, 500);
    }
})
