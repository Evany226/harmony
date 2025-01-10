import React from "react";

import { SocketProvider } from "@/context/SocketContext";
import { VoiceCallProvider } from "@/context/VoiceCallContext";
import SideNavWrapper from "@/components/nav/SideNavWrapper";

import { GuildProvider } from "@/context/GuildContext";
import { SignedIn } from "@clerk/nextjs";
import { VoiceRoomProvider } from "@/context/VoiceRoomContext";
import VoiceChannelOverlay from "@/components/conference/VoiceChannelOverlay";
import { AudioProvider } from "@/context/AudioContext";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AudioProvider>
      <VoiceCallProvider>
        <GuildProvider>
          <VoiceRoomProvider>
            <SocketProvider>
              <main className="flex w-full h-[100vh] bg-gray-100 relative">
                <SideNavWrapper />
                <VoiceChannelOverlay />
                {children}
              </main>
            </SocketProvider>
          </VoiceRoomProvider>
        </GuildProvider>
      </VoiceCallProvider>
    </AudioProvider>
  );
}
