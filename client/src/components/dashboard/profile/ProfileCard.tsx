"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { useUser } from "@clerk/nextjs";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import ProfileCardSkeleton from "@/components/skeletons/ProfileCardSkeleton";
import { socket } from "@/app/socket";
import { useVoiceChannel } from "@/context/VoiceChannelContext";
import { WifiIcon, PhoneXMarkIcon } from "@heroicons/react/24/solid";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react";

export default function ProfileCard() {
  const { isSignedIn, user } = useUser();
  const { isVoiceChannelOpen, currentRoom, token } = useVoiceChannel();

  const serverUrl = "wss://harmony-zknfyk4k.livekit.cloud";

  const controls = {
    microphone: true,
    camera: false,
    chat: false,
    screenShare: false,
    leave: true,
    settings: false,
  };

  return (
    <>
      {isSignedIn ? (
        <main className="bottom-0 absolute w-full">
          {isVoiceChannelOpen && (
            <section className="bg-stone-900 w-full h-20 flex flex-col items-center px-3 py-2 border-t border-zinc-800">
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <WifiIcon className="w-5 h-5 text-green-500 mr-1" />
                  <p className="text-green-500 font-medium text-sm">
                    Voice Connected
                  </p>
                </div>

                <PhoneXMarkIcon className="w-5 h-5 text-gray-300 cursor-pointer" />
              </div>
              <div className="flex items-center justify-center w-full h-full">
                <LiveKitRoom
                  token={token}
                  serverUrl={serverUrl}
                  connect={true}
                  audio={true}
                  data-lk-theme="default"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <RoomAudioRenderer />
                </LiveKitRoom>
              </div>
            </section>
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
