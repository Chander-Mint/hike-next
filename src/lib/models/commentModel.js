import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: String,
    commentableType: {
        type: String,
        enum: ['Blog', 'Event'],
        required: true
    },
    commentableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'commentableType'
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
