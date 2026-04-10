import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

const ProtectedRoutes = ["/myreservation", "/checkout", "/admin"];

export default auth((request) => {
    const session = request.auth;
    const isLoggedIn = !!session?.user;
    const role = session?.user?.role;
    const { pathname } = request.nextUrl;

    // Jika user belum login dan mencoba mengakses halaman yang dilindungi (protected routes),
    // maka akan diarahkan ke halaman signin
    if (!isLoggedIn && ProtectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/signin", request.url))
    }

    // Jika user sudah login tetapi bukan admin dan mencoba mengakses halaman admin,
    // maka akan diarahkan ke halaman utama (homepage)
    if (isLoggedIn && role !== "admin" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    // Jika user sudah login dan mencoba mengakses halaman signin,
    // maka akan diarahkan ke halaman utama (homepage)
    if (isLoggedIn && pathname.startsWith("/signin")) {
        return NextResponse.redirect(new URL("/", request.url))
    }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}