import { HashtagIcon } from "@heroicons/react/24/solid";
import { getGuild } from "@/lib/guilds";
import { getAllMembers } from "@/lib/guilds";
import { auth } from "@clerk/nextjs/server";
import {
  UserPlusIcon,
  PhotoIcon,
  ChatBubbleBottomCenterTextIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";

import UserPanel from "@/components/guilds/users/UserPanel";

export default async function GuildPage({
  params,
}: {
  params: { id: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const guild = await getGuild(token as string, params.id);

  const members = await getAllMembers(token as string, params.id);

  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 items-center">
        <HashtagIcon className="w-5 text-gray-300 cursor-pointer ml-2" />
        <h1 className="text-gray-300 font-semibold ml-1 text-sm">
          This is the entry point to your guild.
        </h1>
      </header>
      <div className="flex w-full h-[calc(100%-3rem)] ">
        <main className="w-[calc(100%-16rem)] h-full border-r border-zinc-800 flex flex-col relative">
          <div className="h-full w-full flex flex-col items-center justify-center">
            <section className="flex flex-col items-center justify-center space-y-2 p-2 ">
              <h2 className="text-gray-300 font-bold text-3xl">
                Welcome to {guild.name}
              </h2>
              <p className="text-gray-400 text-normal font-semibold text-center">
                This is your brand new shiny guild. You can chat, hangout{" "}
                <br></br>
                whatever you want. Here are some steps to help you get started.
              </p>
            </section>
            <section className="space-y-2 mt-4">
              <div className="bg-neutral-950 p-4 rounded-md flex items-center space-x-2">
                <UserPlusIcon className="h-6 w-6 text-gray-300" />
                <p className="text-gray-300 text-sm font-medium">
                  Invite your friends
                </p>
              </div>
              <div className="bg-neutral-950 p-4 rounded-md flex items-center space-x-2">
                <PhotoIcon className="h-6 w-6 text-gray-300" />
                <p className="text-gray-300 text-sm font-medium ">
                  Personalize your server with an icon.
                </p>
              </div>
              <div className="bg-neutral-950 p-4 rounded-md flex items-center space-x-2">
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-300" />
                <p className="text-gray-300 text-sm font-medium">
                  Send your first message
                </p>
              </div>
              <div className="bg-neutral-950 p-4 rounded-md flex items-center space-x-2">
                <SpeakerWaveIcon className="h-6 w-6 text-gray-300" />
                <p className="text-gray-300 text-sm font-medium ">
                  Join your first voice channel.
                </p>
              </div>
            </section>
          </div>
        </main>

        <UserPanel members={members} />
      </div>
    </>
  );
}
