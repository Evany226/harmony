import React from "react";
import SideNav from "@/components/nav/SideNav";
import { SocketProvider } from "@/context/SocketContext";
import { VoiceCallProvider } from "@/context/VoiceCallContext";

import { GuildProvider } from "@/context/GuildContext";
import { SignedIn } from "@clerk/nextjs";
import { VoiceRoomProvider } from "@/context/VoiceRoomContext";
import VoiceChannelOverlay from "@/components/conference/VoiceChannelOverlay";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <VoiceCallProvider>
        <GuildProvider>
          <VoiceRoomProvider>
            <SocketProvider>
              <main className="flex w-full h-[100vh] bg-gray-100 relative">
                <SideNav />
                <VoiceChannelOverlay />
                {children}
              </main>
            </SocketProvider>
          </VoiceRoomProvider>
        </GuildProvider>
      </VoiceCallProvider>
    </SignedIn>
  );
}
