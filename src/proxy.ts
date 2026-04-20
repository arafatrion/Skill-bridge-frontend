import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './services/auth' 

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    let user = null;

    try {
        
        user = await getUser();
    } catch (error) {
       
        console.error("Auth process failed:", error);
        
       
        if (!pathname.startsWith('/login') && !pathname.startsWith('/register')) {
            return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
        }
        return NextResponse.next();
    }


    if (!user) {
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            return NextResponse.next();
        }
      
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }

  
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

  
    const userRole = user?.role;

    if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname.startsWith('/tutor') && userRole !== 'TUTOR') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname.startsWith('/student') && userRole !== 'STUDENT') {
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