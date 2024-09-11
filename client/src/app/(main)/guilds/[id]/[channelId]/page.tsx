import { auth } from "@clerk/nextjs/server";
import { getChannel } from "@/lib/guilds";
import { HashtagIcon } from "@heroicons/react/24/solid";
import { Hash } from "lucide-react";

export default async function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const channel = await getChannel(token as string, params.channelId);

  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-1 items-center">
        <HashtagIcon className="w-5 text-gray-300 cursor-pointer ml-2" />
        <h1 className="text-gray-300 font-semibold">{channel.name}</h1>
      </header>
      <div className="flex w-full h-full ">
        <main className="w-4/5 h-full border-r border-zinc-800 flex flex-col relative px-2"></main>
        <aside className="w-1/5 h-full border-r border-zinc-800 flex flex-col relative px-2"></aside>
      </div>
    </>
  );
}
