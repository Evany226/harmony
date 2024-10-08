import React from "react";
import SideNav from "@/components/nav/SideNav";
import { SocketProvider } from "@/context/SocketContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { SignedIn } from "@clerk/nextjs";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <SocketProvider>
        <main className="flex w-full h-[100vh] bg-gray-100">
          <SideNav />
          {children}
        </main>
      </SocketProvider>
    </SignedIn>
  );
}
