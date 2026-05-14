import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "قانوني - نظام إدارة قانوني",
  description: "نظام إدارة قانوني متميز لشركات ومكاتب المحاماة - تصميم عربي RTL احترافي"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen antialiased">
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50">
          <Sidebar />
          <div className="min-w-0 flex-1 lg:mr-80">
            <Topbar />
            <main className="px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
