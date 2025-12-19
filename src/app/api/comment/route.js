import mongoose from 'mongoose';
import Comment from '@/src/lib/models/commentModel';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { withDB } from '@/src/lib/utils/dbUtils';
import Event from '@/src/lib/models/eventModel';
import Blog from '@/src/lib/models/blogModel';

// export const GET = withDB(async (req) => {
//     try {
//         const { searchParams } = new URL(req.url);
//         const blogId = searchParams.get('blogId');
//         const eventId = searchParams.get('eventId');

//         if (!blogId && !eventId) {
//             return sendError('Blog ID or Event ID is required', 400);
//         }

//         let query = {};
//         if (blogId) {
//             query.commentableType = 'Blog';
//             query.commentableId = blogId;
//         } else {
//             query.commentableType = 'Event';
//             query.commentableId = eventId;
//         }

//         const comments = await Comment.find(query)
//             .populate('replies')
//             .sort({ createdAt: -1 })
//             .lean();

//         return sendSuccess({ comments, message: 'Comments fetched successfully' }, 200);
//     } catch (error) {
//         console.error('Error:', error);
//         return sendError('Failed to fetch comments: ' + error.message, 500);
//     }
// });

export const POST = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { content, name, email, phoneNumber, blog, event, parentCommentId } = await request.json();

        if (!blog && !event) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Blog ID or Event ID is required', 400);
        }

        if (!content || !email || !name) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Content, email and name are required', 400);
        }

        let commentableType, commentableId;

        if (blog) {
            const blogExist = await Blog.findById(blog).session(session);
            if (!blogExist) {
                await session.abortTransaction();
                session.endSession();
                return sendError('Blog not found', 404);
            }
            commentableType = 'Blog';
            commentableId = blog;
        } else {
            const eventExist = await Event.findById(event).session(session);
            if (!eventExist) {
                await session.abortTransaction();
                session.endSession();
                return sendError('Event not found', 404);
            }
            commentableType = 'Event';
            commentableId = event;
        }

        const commentData = {
            content,
            name,
            email,
            phoneNumber,
            commentableType,
            commentableId
        };

        if (parentCommentId) {
            commentData.parentCommentId = parentCommentId
        }

        if (parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId).session(session);
            if (!parentComment) {
                await session.abortTransaction();
                session.endSession();
                return sendError('Parent comment not found', 404);
            }

            const newReply = new Comment(commentData);
            await newReply.save({ session });

            parentComment.replies.push(newReply._id);
            await parentComment.save({ session });

            await session.commitTransaction();
            session.endSession();

            return sendSuccess({ comment: newReply, message: 'Reply added successfully' }, 201);
        } else {
            const newComment = new Comment(commentData);
            await newComment.save({ session });

            await session.commitTransaction();
            session.endSession();

            return sendSuccess({ comment: newComment, message: 'Comment added successfully' }, 201);
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error:', error);
        return sendError('Failed to add comment: ' + error.message, 500);
    }
});