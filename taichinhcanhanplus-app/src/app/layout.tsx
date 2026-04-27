import { AuthProvider } from "@/contexts/auth-context";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ví Thông Minh | Quản lý tài chính cá nhân",
  description:
    "Ứng dụng quản lý thu chi, ví, ngân sách và báo cáo tài chính cá nhân dành cho người Việt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
