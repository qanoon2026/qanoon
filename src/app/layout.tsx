import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { ThemeProvider } from "@/components/ThemeProvider";

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
      <body className="min-h-screen">
        <ThemeProvider>
          <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(var(--accent),0.12),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(var(--accent),0.08),transparent_30%),linear-gradient(180deg, rgb(var(--bg)) 0%, rgb(var(--bg-alt)) 100%)]">
            <AppSidebar />

            <div className="flex-1 flex flex-col lg:mr-80">
              <Topbar />
              <main className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 lg:p-8">
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
