import { auth } from "@clerk/nextjs/server";
import { getChannel, getAllMembers } from "@/lib/guilds";
import { HashtagIcon } from "@heroicons/react/24/solid";
import ChatInput from "@/components/global/ChatInput";
import UserPanel from "@/components/guilds/UserPanel";

export default async function ChannelPage({
  params,
}: {
  params: { id: string; channelId: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const channel = await getChannel(token as string, params.channelId);

  const members = await getAllMembers(token as string, params.id);

  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-1 items-center">
        <HashtagIcon className="w-5 text-gray-300 cursor-pointer ml-2" />
        <h1 className="text-gray-300 font-semibold">{channel.name}</h1>
      </header>
      <div className="flex w-full h-[calc(100%-3rem)] ">
        <main className="w-10/12 h-full border-r border-zinc-800 flex flex-col relative px-5">
          <div className="h-full w-full flex flex-col overflow-y-auto mb-4">
            {/* <ConvEmptyState name={chatTitle} imageUrl={users[0].imageUrl} />

                {messages.map((message: Message) => {
                  const sender = message.sender;

                  return (
                    <MessageCard
                      key={message.id}
                      name={sender.username}
                      message={message.content}
                      createdAt={message.createdAt}
                      imageUrl={sender.imageUrl}
                    />
                  );
                })}
                <div ref={messagesEndRef} /> */}
          </div>
          <ChatInput />
        </main>

        <UserPanel members={members} />
      </div>
    </>
  );
}
