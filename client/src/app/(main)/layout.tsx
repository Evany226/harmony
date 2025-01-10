import React from "react";

import { SocketProvider } from "@/context/SocketContext";
import { VoiceCallProvider } from "@/context/VoiceCallContext";
import SideNavWrapper from "@/components/nav/SideNavWrapper";

import { GuildProvider } from "@/context/GuildContext";

import { VoiceRoomProvider } from "@/context/VoiceRoomContext";

import { AudioProvider } from "@/context/AudioContext";
import dynamic from "next/dynamic";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const VoiceChannelOverlay = dynamic(
    () => import("@/components/conference/VoiceChannelOverlay"),
    { ssr: false }
  );

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
