"use client";

import { useAuth } from "@clerk/nextjs";
import { HashtagIcon } from "@heroicons/react/24/solid";
import ChatInput from "@/components/global/ChatInput";
import UserPanel from "@/components/guilds/users/UserPanel";

import { getAllChannelMessages, getChannel, getAllMembers } from "@/lib/guilds";
import { useEffect, useState, useRef } from "react";
import { ChannelMessages, TextChannel, Member } from "@/types";
import GuildEmptyState from "@/components/empty-states/GuildEmptyState";
import MessageCard from "@/components/global/MessageCard";
import ChatHeader from "@/components/global/ChatHeader";
import { createChannelMessage } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import { GuildPageSkeleton } from "@/components/skeletons/GuildPageSkeleton";
import { useGuild } from "@/context/GuildContext";
import { getActiveVoiceChannels } from "@/lib/guilds";
import GuildPageHeader from "@/components/guilds/GuildPageHeader";

export default function ChannelPage({
  params,
}: {
  params: { id: string; channelId: string };
}) {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [messages, setMessages] = useState<ChannelMessages[]>([]);
  const [channel, setChannel] = useState<TextChannel | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
  // const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { socket, isConnected } = useSocket();

  const {
    guildMembers: members,
    updateGuildMembers,
    updateActiveVoiceChannels,
  } = useGuild();

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
      updateGuildMembers(members);

      const participants = await getActiveVoiceChannels(
        token as string,
        params.id
      );
      updateActiveVoiceChannels(participants, members);

      setLoading(false);
    };

    fetchData();
  }, [
    getToken,
    params.channelId,
    params.id,
    updateGuildMembers,
    updateActiveVoiceChannels,
  ]);

  useEffect(() => {
    const handleMessage = (msg: ChannelMessages) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    const handleEditMessage = (msg: ChannelMessages) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === msg.id
            ? { ...message, content: msg.content, edited: msg.edited }
            : message
        )
      );
    };

    // socket.on("newChannel", (channelId: string) => {
    //   socket.emit("joinChannel", channelId);
    // });

    socket.on(`channelMessage ${params.channelId}`, handleMessage);

    socket.on(`editChannelMessage ${params.channelId}`, handleEditMessage);

    socket.on(`updateGuild ${params.id}`, async () => {
      //revalidates the other clients when a new member joins
      console.log("revalidating");
      const token = await getToken();
      const members = await getAllMembers(token as string, params.id);
      updateGuildMembers(members);

      const messages = await getAllChannelMessages(
        token as string,
        params.channelId
      );
      setMessages(messages);
    });

    socket.on(`deleteChannel ${params.channelId}`, (channelId) => {
      router.push(`/guilds/${params.id}`);
    });

    //cleans up by turning off functions when useEffect dismounts
    return () => {
      socket.off(`channelMessage ${params.channelId}`, handleMessage);
      socket.off("updateGuild");
      socket.off(`editChannelMessage ${params.channelId}`, handleEditMessage);
      socket.off(`deleteChannel ${params.channelId}`);
    };
  }, [
    params.channelId,
    socket,
    toast,
    router,
    params.id,
    getToken,
    updateGuildMembers,
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (formData.get("content") === "") {
      toast({
        variant: "destructive",
        title: "Message cannot be empty",
        description: "Please enter a message.",
      });
      return;
    }

    try {
      const result = await createChannelMessage(
        params.channelId,
        params.id,
        formData
      );

      socket.emit("channelMessage", result);
      formRef.current?.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description:
          error.message ||
          "An error occurred while sending the message. Please try again later.",
      });
    }
  };

  const toggleUserPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  if (loading) {
    return <GuildPageSkeleton />; // You can show a loading state here
  }

  if (!channel) {
    router.push(`/guilds/${params.id}`);
  } else {
    return (
      <>
        <GuildPageHeader
          channel={channel}
          toggleUserPanel={toggleUserPanel}
          isPanelOpen={isPanelOpen}
        />
        <div className="flex w-full h-[calc(100%-3rem)] ">
          <main
            className={`h-full border-r border-zinc-800 flex flex-col relative ${
              isPanelOpen ? "w-[calc(100%-16rem)]" : "w-full"
            }`}
          >
            <div className="h-full w-full flex flex-col overflow-y-auto mb-4">
              {messages.length === 0 ? (
                <GuildEmptyState
                  name={channel.name}
                  imageUrl={"/images/logo-past.png"}
                />
              ) : (
                <>
                  <ChatHeader
                    name={channel.name}
                    imageUrl={"/images/logo-past.png"}
                  />
                  {messages.map((message: ChannelMessages) => {
                    return (
                      <MessageCard
                        key={message.id}
                        message={message}
                        variant="channel"
                      />
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
            <div className="px-5">
              <ChatInput handleSubmit={handleSubmit} formRef={formRef} />
            </div>
          </main>

          <UserPanel members={members} isPanelOpen={isPanelOpen} />
        </div>
      </>
    );
  }
}
