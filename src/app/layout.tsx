import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "قانوني - نظام إدارة قضايا متقدم",
  description: "منصة إدارة قضايا قانونية متطورة للمكاتب والشركات القانونية - تصميم سعودي احترافي RTL",
  metadataBase: new URL("http://localhost:3000"),
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
      <body>
        <div className="flex min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
          {/* Sidebar */}
          <AppSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:mr-80">
            <Topbar />
            <main className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
