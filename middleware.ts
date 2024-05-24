import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

// Define public and ignored routes
const publicRoutes = ['/', '/api/webhook/clerk'];
const ignoredRoutes = ['/api/webhook/clerk'];

// Custom middleware to handle public and ignored routes
function customClerkMiddleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the route is ignored
  if (ignoredRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Apply Clerk middleware for all other routes
  return clerkMiddleware()(req, ev);
}

export default customClerkMiddleware;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
