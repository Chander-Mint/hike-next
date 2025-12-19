import orderModel from "@/src/lib/models/orderModel";
import userModel from "@/src/lib/models/userModel";
import { withDB } from "@/src/lib/utils/dbUtils";
import { sendError, sendSuccess } from "@/src/lib/utils/responseUtils";

export const GET = withDB(async (req) => {
    try {
        const { pathname } = req.nextUrl;
        const id = pathname.split('/').pop();

        if (!id) {
            return sendError('Order ID is required', 400);
        }

        const order = await orderModel.findById(id).populate('user', 'name email').lean();

        if (!order) {
            return sendError('Order not found', 404);
        }

        return sendSuccess({ order, message: 'Order fetched successfully' }, 200);

    } catch (error) {
        return sendError(error.message, 500);
    }
});