import Link from "next/link";
import { type ReactNode } from "react";

export default function TodoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <nav className="border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            T3 Todo App
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-blue-300 transition-colors">
              Home
            </Link>
            <Link href="/todo" className="hover:text-blue-300 transition-colors font-medium">
              Todos
            </Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}