"use client";

import { useAuth } from "@clerk/nextjs";
import { HashtagIcon } from "@heroicons/react/24/solid";
import ChatInput from "@/components/global/ChatInput";
import UserPanel from "@/components/guilds/users/UserPanel";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import {
  getFirstChannel,
  getAllChannelMessages,
  getChannel,
  getAllMembers,
} from "@/lib/guilds";
import { useEffect, useState } from "react";
import { ChannelMessages, TextChannel, Member } from "@/types";
import GuildEmptyState from "@/components/empty-states/GuildEmptyState";
import MessageCard from "@/components/global/MessageCard";
import ChatHeader from "@/components/global/ChatHeader";

export default function ChannelPage({
  params,
}: {
  params: { id: string; channelId: string };
}) {
  const { getToken } = useAuth();

  const [messages, setMessages] = useState<ChannelMessages[]>([]);
  const [channel, setChannel] = useState<TextChannel | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //href to the first channel in a guild. used for redirecting if the current channel is not found
  const [firstChannel, setFirstChannel] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const messages = await getAllChannelMessages(
        token as string,
        params.channelId
      );
      setMessages(messages);

      const channel = await getChannel(token as string, params.channelId);
      setChannel(channel);

      const members = await getAllMembers(token as string, params.id);
      setMembers(members);

      const firstChannel = await getFirstChannel(token as string, params.id);
      setFirstChannel(firstChannel);

      setLoading(false);

      console.log("loading false");
    };

    fetchData();
  }, [getToken, params.channelId, params.id]);

  if (loading) {
    return <p>Loading...</p>; // You can show a loading state here
  }

  if (!channel) {
    if (firstChannel !== "") {
      redirect(firstChannel);
    } else {
      redirect(`/guilds/${params.id}`);
    }
  }

  return (
    <>
      <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 items-center">
        <HashtagIcon className="w-5 text-gray-300 cursor-pointer ml-2" />
        <h1 className="text-gray-300 font-semibold ml-1 text-sm">
          {channel.name}
        </h1>
        {channel.topic && (
          <>
            <Separator className="mx-3" orientation="vertical" />
            <p className="text-gray-400 font-medium text-xs">{channel.topic}</p>
          </>
        )}
      </header>
      <div className="flex w-full h-[calc(100%-3rem)] ">
        <main className="w-10/12 h-full border-r border-zinc-800 flex flex-col relative px-5">
          <div className="h-full w-full flex flex-col overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <GuildEmptyState
                name={channel.name}
                imageUrl={"/logo-past.png"}
              />
            ) : (
              <>
                <ChatHeader name={channel.name} imageUrl={"/logo-past.png"} />
                {messages.map((message: ChannelMessages) => {
                  const sender = message.sender;

                  return (
                    <MessageCard
                      key={message.id}
                      name={sender.user.username}
                      message={message.content}
                      createdAt={message.createdAt}
                      imageUrl={sender.user.imageUrl}
                    />
                  );
                })}
              </>
            )}
          </div>
          <ChatInput />
        </main>

        <UserPanel members={members} />
      </div>
    </>
  );
}
