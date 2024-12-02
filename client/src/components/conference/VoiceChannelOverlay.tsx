"use client";

import { useVoiceRoom } from "@/context/VoiceRoomContext";
import { WifiIcon, PhoneXMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useGuild } from "@/context/GuildContext";
import useSound from "use-sound";
import { useUser } from "@clerk/nextjs";
import { socket } from "@/app/socket";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  TrackToggle,
  DisconnectButton,
  useParticipants,
} from "@livekit/components-react";
import { Room, Track } from "livekit-client";

export default function VoiceChannelOverlay() {
  const serverUrl = "wss://harmony-zknfyk4k.livekit.cloud";

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playMuteSound] = useSound("/audio/mute-sound.mp3");
  const [playUnmuteSound] = useSound("/audio/unmute-sound.mp3");

  const { updateMuteStatus } = useGuild();
  const { user } = useUser();
  const {
    isConnected,
    room,
    disconnect,
    currentChannel,
    currentGuild,
    token,
    currentGuildId,
  } = useVoiceRoom();

  const onMicrophoneChange = (enabled: boolean, isUserInitiated: boolean) => {
    if (!isUserInitiated) {
      return;
    }

    if (!currentChannel) {
      return;
    }
    console.log(user?.username);
    setIsMuted(!enabled);
    updateMuteStatus(currentChannel.id, user?.username as string, !enabled);
    socket.emit("muteVoiceChannel", {
      guildId: currentGuildId,
      channelId: currentChannel.id,
      username: user?.username,
      isMuted: !enabled,
    });

    if (enabled) {
      playUnmuteSound();
    } else {
      playMuteSound();
    }
  };

  const handleLeaveChannel = () => {
    disconnect();
  };

  return (
    <>
      {isConnected && room && (
        <div className="absolute bottom-14 max-w-64 left-[5.25rem] z-50">
          <LiveKitRoom room={room} token={token} serverUrl={serverUrl}>
            <section className="bg-stone-900 w-64 flex flex-col items-center px-3 py-2 border border-zinc-800 ">
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
                    showIcon={true}
                    source={Track.Source.Microphone}
                    onChange={onMicrophoneChange}
                    className={` hover:bg-zinc-700 p-1.5 rounded-sm text-red-500"
                    }`}
                    style={{ color: isMuted ? "#ef4444" : "#d1d5db" }}
                  />
                  <DisconnectButton
                    className="hover:bg-zinc-700 p-1.5 rounded-sm"
                    onClick={handleLeaveChannel}
                  >
                    <PhoneXMarkIcon className="w-4 h-4 text-gray-300 cursor-pointer" />
                  </DisconnectButton>
                </div>
              </div>
              <div className="flex items-center justify-center w-full h-full"></div>
            </section>
          </LiveKitRoom>
        </div>
      )}
    </>
  );
}