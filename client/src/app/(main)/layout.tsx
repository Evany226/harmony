import React from "react";
import SideNav from "@/components/nav/SideNav";
import { SocketProvider } from "@/context/SocketContext";
import { NotificationProvider } from "@/context/NotificationContext";

import { GuildProvider } from "@/context/GuildContext";
import { SignedIn } from "@clerk/nextjs";
import { VoiceRoomProvider } from "@/context/VoiceRoomContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <NotificationProvider>
        <GuildProvider>
          <VoiceRoomProvider>
            <SocketProvider>
              <main className="flex w-full h-[100vh] bg-gray-100">
                <SideNav />
                {children}
              </main>
            </SocketProvider>
          </VoiceRoomProvider>
        </GuildProvider>
      </NotificationProvider>
    </SignedIn>
  );
}
