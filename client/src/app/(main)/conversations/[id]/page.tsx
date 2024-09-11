"use client";

import { useState, useEffect, useRef } from "react";
import { getConversation, getAllMessages } from "@/lib/conversations";
import { useAuth } from "@clerk/nextjs";
import { User, Message } from "@/types/index.js";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ChatInput from "@/components/global/ChatInput";
import ConvEmptyState from "@/components/empty-states/ConvEmptyState";
import MessageCard from "@/components/global/MessageCard";
import ConvPageSkeleton from "@/components/skeletons/ConvPageSkeleton";

import { createMessage } from "@/lib/conversations";
import { useToast } from "@/components/ui/use-toast";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const [chatTitle, setChatTitle] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [socketLoading, setSocketLoading] = useState<boolean>(false);
  const { socket, isConnected } = useSocket();

  const { user: currUser } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const conversationObject = await getConversation(
        token as string,
        params.id
      );

      if (!conversationObject) {
        router.push("/404");
      }
      const messages = await getAllMessages(token as string, params.id);

      setMessages(messages);

      const users = conversationObject.users.filter(
        (user: User) => currUser && user.id !== currUser.id
      );

      setUsers(users);
      setImage(users[0].imageUrl);

      const header = await users.map((user: User) => user.username).join(" | ");
      setChatTitle(header);

      setLoading(false);
    };

    if (currUser) {
      fetchData();
    }
  }, [getToken, params.id, currUser, router]);

  useEffect(() => {
    const handleMessage = (msg: Message) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on(`message ${params.id}`, handleMessage);

    //cleans up by turning off functions when useEffect dismounts
    return () => {
      socket.off(`message ${params.id}`, handleMessage);
    };
  }, [params.id, socket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === "") {
      toast({
        variant: "destructive",
        title: "Message cannot be empty",
        description: "Please enter a message.",
      });
      return;
    }

    setSocketLoading(true);

    try {
      const result = await createMessage(params.id, inputValue);
      socket.emit("message", result);
      socket.emit("notification", result);
      setInputValue("");
      setSocketLoading(false);
    } catch (error: any) {
      console.log("Failed to create message:" + error);
    } finally {
      setSocketLoading(false);
    }
  };

  return (
    <>
      {users.length > 0 ? (
        <>
          <header className="flex w-full h-12 bg-zinc-900 border-b border-zinc-800 px-2 py-3 space-x-3 items-center ">
            <Avatar className="w-7 h-7 ml-2">
              <AvatarImage src={image} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <h1 className="text-gray-300 font-semibold">{chatTitle}</h1>
          </header>

          <main className="w-full h-[calc(100%-3rem)] flex flex-col">
            <article className="w-3/4 h-full border-r border-zinc-800 flex flex-col relative px-5">
              <div className="h-full w-full flex flex-col overflow-y-auto mb-4">
                <ConvEmptyState name={chatTitle} imageUrl={users[0].imageUrl} />

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
                <div ref={messagesEndRef} />
              </div>
              <ChatInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSubmit={handleSubmit}
                socketLoading={socketLoading}
              />
            </article>
          </main>
        </>
      ) : (
        <ConvPageSkeleton />
      )}
    </>
  );
}
