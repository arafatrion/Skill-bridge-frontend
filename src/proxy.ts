import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './services/auth' 

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const user = await getUser();
    if (!user) {
        
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }

  
    if (user && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

   
    if (pathname.startsWith('/admin') && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname.startsWith('/tutor') && user.role !== 'TUTOR') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        '/admin/:path*',
        '/tutor/:path*',
        '/student/:path*',
        '/dashboard/:path*',
        '/login',
        '/register'
    ],
}