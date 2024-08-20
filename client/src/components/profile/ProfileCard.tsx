"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function ProfileCard() {
  const { isSignedIn, user } = useUser();

  return (
    <>
      {isSignedIn ? (
        <div className="flex items-center w-full h-14 px-3 bg-stone-900 border-t border-zinc-800 bottom-0 absolute">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>EY</AvatarFallback>
          </Avatar>
          <div className="flex-col ml-2">
            <h2 className="text-gray-300 font-medium text-sm">
              {user.username}
            </h2>
            <div className="flex items-center">
              <p className="text-xs font-normal text-gray-400">Online</p>
              <SignOutButton>
                <button className="bg-white text-black rounded-sm px-1 ml-1 text-sm">
                  Logout
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
