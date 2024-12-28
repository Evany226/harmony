"use client";
import { useUser } from "@clerk/nextjs";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import ProfileCardSkeleton from "@/components/skeletons/ProfileCardSkeleton";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { useClerk } from "@clerk/nextjs";

export default function ProfileCard() {
  const { isSignedIn, user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <>
      {isSignedIn ? (
        <main className="bottom-0 absolute w-full">
          <section className="flex items-center w-full h-14 px-2 bg-stone-900 border-t border-zinc-800">
            {/* <Avatar>
            <AvatarImage
              src={
                user.hasImage ? user.imageUrl : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>EY</AvatarFallback>
          </Avatar> */}

            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "w-8 h-8",
                  userButtonAvatarBox: "w-full h-full",
                },
              }}
            />

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
            <Cog8ToothIcon
              className="w-6 h-6 ml-auto text-gray-400 cursor-pointer mr-1"
              onClick={() => openUserProfile()}
            />
          </section>
        </main>
      ) : (
        <ProfileCardSkeleton />
      )}
    </>
  );
}
