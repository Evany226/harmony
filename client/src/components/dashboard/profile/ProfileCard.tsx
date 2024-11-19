"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { useUser } from "@clerk/nextjs";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import ProfileCardSkeleton from "@/components/skeletons/ProfileCardSkeleton";
import { socket } from "@/app/socket";

import { WifiIcon, PhoneXMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useGuild } from "@/context/GuildContext";
import { useVoiceRoom } from "@/context/VoiceRoomContext";
import VoiceChannelOverlay from "@/components/conference/VoiceChannelOverlay";

export default function ProfileCard() {
  const { isSignedIn, user } = useUser();

  return (
    <>
      {isSignedIn ? (
        <main className="bottom-0 absolute w-full">
          <VoiceChannelOverlay />

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
