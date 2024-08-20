import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { noto } from "@/app/ui/fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${noto.className}
              min-h-screen bg-background font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
