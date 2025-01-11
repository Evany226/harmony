import type { Metadata } from "next";
import "./globals.css";
import { noto } from "@/app/ui/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Harmony",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={`${noto.className}
              min-h-screen bg-background font-sans antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
