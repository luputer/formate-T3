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
                // Ijinkan akses ke halaman utama ("/") tanpa login
                // (Kita akan handle redirect login user di fungsi middleware di atas)
                if (req.nextUrl.pathname === "/") {
                    return true;
                }
                // Untuk route lain (dashboard), wajib login (token harus ada)
                return !!token;
            },
        },
    }
);

export const config = {
    // Terapkan middleware pada root ("/") dan semua route dashboard
    matcher: ["/", "/dashboard/:path*"],
};
