import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@radix-ui/react-toast";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Description Generator",
  description: "POC for generating product descriptions using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"font-custom antialiased"}>
        <ToastProvider>
          <main className="grid place-items-center py-8">{children}</main>
          <Toaster />
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
