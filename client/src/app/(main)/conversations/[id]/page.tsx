"use client";

import { useState, useEffect, useRef } from "react";
import { getConversation, getAllMessages } from "@/lib/conversations";
import { useAuth } from "@clerk/nextjs";
import { User, Message, Participant } from "@/types/index.js";
import { useUser } from "@clerk/nextjs";
import useSound from "use-sound";

import ChatInput from "@/components/global/ChatInput";
import ChatHeader from "@/components/global/ChatHeader";
import MessageCard from "@/components/global/MessageCard";
import ConvPageSkeleton from "@/components/skeletons/ConvPageSkeleton";
import ConvPageHeader from "@/components/conversations/ConvPageHeader";
import ConvProfilePanel from "@/components/conversations/ConvProfilePanel";
import VoiceCallOverlay from "@/components/conference/VoiceCallOverlay";
import PendingVoiceCall from "@/components/conference/PendingVoiceCall";
import { socket } from "@/app/socket";

import { createMessage } from "@/actions/conv";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { checkRoomEmpty } from "@/lib/conversations";
import { useVoiceRoom } from "@/context/VoiceRoomContext";
import { useVoiceCall } from "@/context/VoiceCallContext";

import { usePathname } from "next/navigation";

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const [headerText, setHeaderText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [socketLoading, setSocketLoading] = useState<boolean>(false);
  const { isVoiceCallOpen, setIsVoiceCallOpen } = useVoiceCall();
  const { isConnected: isVoiceChannelOpen, disconnect } = useVoiceRoom();
  const [isRoomEmpty, setIsRoomEmpty] = useState<boolean>(true);

  const { user: currUser } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [playJoinSound] = useSound("/audio/join-call.mp3");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  //fetch
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

      const participants = conversationObject.participants.filter(
        (participant: Participant) =>
          currUser && participant.userId !== currUser.id
      );

      const users = participants.map((participant: Participant) => {
        return participant.user;
      });

      setUsers(users);

      const allImages = users.map((user: User) => user.imageUrl);
      setAllImages(allImages);

      const header = await users.map((user: User) => user.username).join(" | ");
      setHeaderText(header);

      const isEmpty = await checkRoomEmpty(params.id);
      setIsRoomEmpty(isEmpty.empty);

      setLoading(false);
    };

    if (currUser) {
      fetchData();
    }
  }, [getToken, params.id, currUser, router]);

  //handle incoming sockets
  useEffect(() => {
    const handleMessage = (msg: Message) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    const handleEdit = (msg: Message) => {
      console.log("Received edited message:", msg);
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === msg.id
            ? { ...message, content: msg.content, edited: msg.edited }
            : message
        )
      );
    };

    const updateRoom = (isEmpty: boolean) => {
      setIsRoomEmpty(isEmpty);
    };

    socket.on(`message ${params.id}`, handleMessage);
    socket.on(`editMessage ${params.id}`, handleEdit);
    socket.on(`checkRoomEmpty ${params.id}`, updateRoom);

    //cleans up by turning off functions when useEffect dismounts
    return () => {
      socket.off(`message ${params.id}`, handleMessage);
      socket.off(`editMessage ${params.id}`, handleEdit);
      socket.off(`checkRoomEmpty ${params.id}`, updateRoom);
    };
  }, [params.id]);

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

  const startVoiceCall = () => {
    if (isVoiceChannelOpen) {
      disconnect();
    }

    if (!isVoiceCallOpen && isRoomEmpty) {
      playJoinSound();
      setIsVoiceCallOpen(true);
      socket.emit("newVoiceCall", params.id, currUser?.imageUrl);
    } else {
      toast({
        variant: "destructive",
        title: "Failed to start voice call.",
        description: `${
          pathname === `/conversations/${params.id}`
            ? "There is already an ongoing voice call in this conversation."
            : "You cannot start a new voice call while already in one. Please leave first."
        }`,
      });
    }
  };

  const lateJoinVoiceCall = () => {
    if (isVoiceChannelOpen) {
      disconnect();
    }

    if (!isVoiceCallOpen && !isRoomEmpty) {
      playJoinSound();
      setIsVoiceCallOpen(true);
      socket.emit("joinVoiceCall", params.id);
    } else {
      toast({
        variant: "destructive",
        title: "Already in a voice call.",
        description: `${
          pathname === `/conversations/${params.id}`
            ? "You are already in this voice call."
            : "You cannot start a new voice call while already in one. Please leave first."
        }`,
      });
    }
  };

  return (
    <>
      {users.length > 0 ? (
        <>
          <ConvPageHeader
            headerText={headerText}
            image1={allImages[0]}
            image2={allImages[1]}
            hasMultipleUsers={users.length > 1}
            startVoiceCall={startVoiceCall}
          />

          <main className="w-full h-[calc(100%-3rem)] flex">
            <article className="w-4/5 h-full border-r border-zinc-800 flex flex-col relative px-0">
              {isVoiceCallOpen && <VoiceCallOverlay convId={params.id} />}

              {!isRoomEmpty && !isVoiceCallOpen && (
                <PendingVoiceCall
                  allImages={allImages}
                  lateJoin={lateJoinVoiceCall}
                />
              )}
              <div
                className={`w-full flex flex-col overflow-y-auto mb-4 ${
                  isVoiceCallOpen ? "h-1/2" : "h-full"
                }`}
              >
                <ChatHeader name={headerText} imageUrl={users[0].imageUrl} />

                {messages.map((message: Message) => {
                  return (
                    <MessageCard
                      key={message.id}
                      message={message}
                      variant="conversation"
                    />
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <div className="px-5">
                <ChatInput
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  handleSubmit={handleSubmit}
                  socketLoading={socketLoading}
                />
              </div>
            </article>

            <ConvProfilePanel imageUrl={allImages[0]} name={headerText} />
          </main>
        </>
      ) : (
        <ConvPageSkeleton />
      )}
    </>
  );
}
