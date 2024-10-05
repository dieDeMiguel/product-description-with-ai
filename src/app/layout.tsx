import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@radix-ui/react-toast";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Press Release Generator",
  description: "POC for generating press releases using AI",
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
          <main className="min-h-screen p-2 sm:p-4 grid place-items-center">
            {children}
          </main>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
