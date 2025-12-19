import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const pathname = request.nextUrl.pathname;

    const isAuth = !!token;
    const userRole = token?.role || null;

    const isAdminRoute = pathname.startsWith('/admin');
    const isGeneralSettingsAPI = pathname.startsWith('/admin/api/generalSettings');

    // Not authenticated — redirect or block
    if (!isAuth && isAdminRoute) {
        if (pathname.startsWith('/admin/api')) {
            return new NextResponse(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (isGeneralSettingsAPI && userRole !== 'superAdmin') {
        return new NextResponse(
            JSON.stringify({ error: 'Forbidden - superAdmin only' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin((?!/login).*)',
        '/admin/api/:path*'
    ],
};
