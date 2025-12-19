
import mongoose from 'mongoose';
import connectDB from '@/src/lib/db/connectDB';

export async function GET() {
    try {
        await connectDB();
        const status = mongoose.connection.readyState;

        let statusMessage = '';
        switch (status) {
            case 0: statusMessage = 'disconnected'; break;
            case 1: statusMessage = 'connected'; break;
            case 2: statusMessage = 'connecting'; break;
            case 3: statusMessage = 'disconnecting'; break;
        }

        return Response.json({
            status: statusMessage,
            code: status,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Database connection failed',
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
