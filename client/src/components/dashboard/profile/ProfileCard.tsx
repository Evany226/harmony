"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { useUser } from "@clerk/nextjs";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import ProfileCardSkeleton from "@/components/skeletons/ProfileCardSkeleton";
import { socket } from "@/app/socket";
import { useVoiceChannel } from "@/context/VoiceChannelContext";
import { WifiIcon, PhoneXMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useGuildMember } from "@/context/GuildMemberContext";

import { Track } from "livekit-client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  TrackToggle,
  DisconnectButton,
} from "@livekit/components-react";

export default function ProfileCard() {
  const { isSignedIn, user } = useUser();
  const {
    isVoiceChannelOpen,
    currentChannel,
    currentRoom,
    currentGuild,
    token,
    leaveVoiceChannel,
  } = useVoiceChannel();

  const { removeParticipant } = useGuildMember();

  const [isMuted, setIsMuted] = useState<boolean>(false);

  const onMicrophoneChange = (enabled: boolean, isUserInitiated: boolean) => {
    if (!isUserInitiated) {
      return;
    }

    setIsMuted(!enabled);
  };

  const handleLeaveChannel = () => {
    removeParticipant(currentRoom, user?.username as string);
    leaveVoiceChannel();
  };

  const serverUrl = "wss://harmony-zknfyk4k.livekit.cloud";
  return (
    <>
      {isSignedIn ? (
        <main className="bottom-0 absolute w-full">
          {isVoiceChannelOpen && (
            <LiveKitRoom
              token={token}
              serverUrl={serverUrl}
              connect={true}
              audio={true}
              data-lk-theme="default"
            >
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
                      {currentChannel} / {currentGuild}
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

          <section className="flex items-center w-full h-14 px-2 bg-stone-900 border-t border-zinc-800">
            {/* <Avatar>
            <AvatarImage
              src={
                user.hasImage ? user.imageUrl : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>EY</AvatarFallback>
          </Avatar> */}

            <UserButton />

            <div className="flex-col ml-2">
              <h2 className="text-gray-300 font-bold text-xs">
                {user.username}
              </h2>
              <div className="flex items-center">
                <p className="text-xs font-normal text-gray-400">Online</p>

                {/* <SignOutButton redirectUrl={"/"}>
                <button
                  className="bg-white text-black rounded-sm px-1 ml-1 text-sm"
                  onClick={() => socket.disconnect()}
                >
                  Logout
                </button>
              </SignOutButton> */}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <ProfileCardSkeleton />
      )}
    </>
  );
}
