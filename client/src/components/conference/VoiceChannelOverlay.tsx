"use client";

import { useVoiceRoom } from "@/context/VoiceRoomContext";
import { WifiIcon, PhoneXMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  TrackToggle,
  DisconnectButton,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export default function VoiceChannelOverlay() {
  const serverUrl = "wss://harmony-zknfyk4k.livekit.cloud";

  const [isMuted, setIsMuted] = useState<boolean>(false);

  const onMicrophoneChange = (enabled: boolean, isUserInitiated: boolean) => {
    if (!isUserInitiated) {
      return;
    }

    setIsMuted(!enabled);
  };

  const handleLeaveChannel = () => {
    disconnect();
  };

  const { isConnected, room, disconnect, currentChannel, currentGuild, token } =
    useVoiceRoom();

  return (
    <>
      {isConnected && room && (
        <LiveKitRoom room={room} token={token} serverUrl={serverUrl}>
          <section className="bg-stone-900 w-full flex flex-col items-center px-3 py-2 border-t border-zinc-800">
            <RoomAudioRenderer />
            <div className="flex justify-between w-full">
              <section className="flex-col">
                <div className="flex items-center">
                  <WifiIcon className="w-4 h-4 text-green-500 mr-1" />
                  <p className="text-green-500 font-medium text-sm">
                    Voice Connected
                  </p>
                </div>
                <p className="text-gray-400 text-xs">
                  {currentChannel?.name} / {currentGuild}
                </p>
              </section>

              <div className="flex items-center">
                <TrackToggle
                  source={Track.Source.Microphone}
                  onChange={onMicrophoneChange}
                  className={` hover:bg-zinc-700 p-1.5 rounded-sm ${
                    isMuted ? "text-red-500" : "text-gray-300"
                  }`}
                />
                <DisconnectButton onClick={handleLeaveChannel}>
                  <div className="hover:bg-zinc-700 p-1.5 rounded-sm">
                    <PhoneXMarkIcon className="w-4 h-4 text-gray-300 cursor-pointer" />
                  </div>
                </DisconnectButton>
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-full"></div>
          </section>
        </LiveKitRoom>
      )}
    </>
  );
}
