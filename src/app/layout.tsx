import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import { NextAuthProvider } from "~/components/providers";

export const metadata: Metadata = {
  title: "Formate",
  description: "Formate",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <NextAuthProvider>
          <TRPCReactProvider>
            {children}
            <Toaster position="top-right" />
          </TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
