import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromCookies, getDashboardRoute, type Role } from "@/lib/auth";

/**
 * Middleware for route protection
 * 
 * Phase 0: Uses cookies for auth state (non-httpOnly for now)
 * TODO: Replace with httpOnly session cookies when implementing real auth
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (pathname === "/login" || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow static assets
  if (
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/_next/static") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Get session from cookies
  const session = getSessionFromCookies(request.cookies);

  // If not authenticated, redirect to login
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based route access
  const role = session.role;
  const rolePrefix = `/${role}`;

  // If accessing root, redirect to role dashboard
  if (pathname === "/") {
    return NextResponse.redirect(new URL(getDashboardRoute(role), request.url));
  }

  // Prevent cross-role access
  // Allow access to own role routes or shared routes (if any)
  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL(getDashboardRoute(role), request.url));
  }
  if (pathname.startsWith("/manager") && role !== "manager") {
    return NextResponse.redirect(new URL(getDashboardRoute(role), request.url));
  }
  if (pathname.startsWith("/hr") && role !== "hr") {
    return NextResponse.redirect(new URL(getDashboardRoute(role), request.url));
  }
  if (pathname.startsWith("/finance") && role !== "finance") {
    return NextResponse.redirect(new URL(getDashboardRoute(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
