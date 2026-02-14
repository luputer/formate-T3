"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Video,
    BookOpen,
    CloudUpload,
    Users,
    CreditCard,
    Store,
    Menu,
    ChevronDown,
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/dashboard" && pathname === "/dashboard") return true;
        if (path !== "/dashboard" && pathname.startsWith(path)) return true;
        return false;
    };

    const menuItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Webinar", href: "/dashboard/webinar", icon: Video },
        { name: "Kelas", href: "/dashboard/kelas", icon: BookOpen },
        { name: "Produk Digital", href: "/dashboard/produk", icon: CloudUpload },
        { name: "User", href: "/dashboard/users", icon: Users },
        { name: "Transaksi", href: "/dashboard/transaksi", icon: CreditCard },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <Link href="/" className="text-2xl font-bold text-blue-500">
                        Formate
                    </Link>
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <div className="text-xs font-bold text-slate-400 mb-4 px-2 uppercase tracking-wider">
                        Menu
                    </div>
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${active
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <item.icon size={20} className={active ? "text-blue-600" : "text-slate-500"} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Button */}
                <div className="p-4 border-t border-slate-100">
                    <Link
                        href="/dashboard/catalog"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        <Store size={18} />
                        <span>Catalog Saya</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                            <Menu size={24} />
                        </button>
                        {/* Breadcrumb or Title could go here */}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* User Profile */}
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                                    alt="User Avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="hidden md:block text-sm font-medium text-slate-700">
                                Mason Brooks
                            </div>
                            <ChevronDown size={16} className="text-slate-400 hidden md:block" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
