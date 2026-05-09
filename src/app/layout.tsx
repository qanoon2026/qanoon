import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Qanooni",
  description: "نظام إدارة قانوني تجريبي لشركات المحاماة"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen antialiased">
        <div className="flex min-h-screen bg-transparent">
          <Sidebar />
          <div className="min-w-0 flex-1 lg:mr-80">
            <Topbar />
            <main className="px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
