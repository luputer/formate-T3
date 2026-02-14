import Link from "next/link";
import { type ReactNode } from "react";

export default function ProductLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <nav className="border-b border-white/10 bg-black/20 p-4 backdrop-blur-lg">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">
                        T3 Stack App
                    </Link>
                    <div className="flex gap-6">
                        <Link
                            href="/"
                            className="transition-colors hover:text-blue-300"
                        >
                            Home
                        </Link>
                        <Link
                            href="/todo"
                            className="transition-colors hover:text-blue-300"
                        >
                            Todos
                        </Link>
                        <Link
                            href="/product"
                            className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                        >
                            Products
                        </Link>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}