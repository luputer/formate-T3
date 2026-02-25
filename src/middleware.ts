import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Jika user sudah login dan mengakses halaman utama, redirect ke dashboard
        if (req.nextUrl.pathname === "/" && req.nextauth.token) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                // Halaman publik — akses bebas
                if (req.nextUrl.pathname === "/") return true;

                // /catalog/[slug] publik, tapi /catalog/setup wajib login
                if (req.nextUrl.pathname.startsWith("/catalog/") &&
                    !req.nextUrl.pathname.startsWith("/catalog/setup")) {
                    return true;
                }

                // Semua route lain (dashboard, catalog/setup) wajib login
                return !!token;
            },
        },
    }
);

export const config = {
    // Protect dashboard dan catalog/setup, biarkan /catalog/[slug] publik
    matcher: ["/", "/dashboard/:path*", "/catalog/setup"],
};
