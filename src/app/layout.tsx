import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from '@/components/AppSidebar';
import { Topbar } from '@/components/Topbar';
import { ThemeProvider } from '@/components/ThemeProvider';

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
      <body className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text-primary))]">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <div className="flex-1 flex flex-col lg:mr-[260px]">
              <Topbar />
              <main className="flex-1 overflow-y-auto">
                <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
