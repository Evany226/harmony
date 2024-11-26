"use client";

import { useState, useContext, createContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneArrowDownLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import useSound from "use-sound";
import { socket } from "@/app/socket";

interface NotificationContextProps {
  createAlert(username: string, conversationId: string, imageUrl: string): void;
  isVoiceCallOpen: boolean;
  setIsVoiceCallOpen: (value: boolean) => void;
  // isPendingOpen: boolean;
  // setIsPendingOpen: (value: boolean) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [alert, setAlert] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState<boolean>(false);
  const [isPendingOpen, setIsPendingOpen] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [playCallSound, { stop: stopCallSound }] = useSound(
    "/audio/call-sound.mp3"
  );
  const [playJoinSound] = useSound("/audio/join-call.mp3");

  const createAlert = (
    username: string,
    conversationId: string,
    imageUrl: string
  ) => {
    playCallSound();
    setAlert(true);
    setUsername(username);
    setImage(imageUrl);
    setConversationId(conversationId);
    const timeout = setTimeout(() => {
      stopCallSound();
      setAlert(false);
      console.log("timed out ");
    }, 10000);
    setTimeoutId(timeout);
  };

  const handleAcceptCall = () => {
    clearTimeout(timeoutId as NodeJS.Timeout);
    router.push(`/conversations/${conversationId}`);
    setIsVoiceCallOpen(true);
    setAlert(false);
    stopCallSound();
    playJoinSound();
    socket.emit("joinVoiceCall", conversationId);
  };

  const handleRejectCall = () => {
    setIsVoiceCallOpen(false);
    setIsPendingOpen(true);
    clearTimeout(timeoutId as NodeJS.Timeout);
    setAlert(false);
    stopCallSound();
  };

  const value = {
    createAlert,
    isVoiceCallOpen,
    setIsVoiceCallOpen,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {alert && (
        <main className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center justify-center px-8 py-4 rounded-md bg-zinc-950 animate-pulse">
            <Avatar className="w-24 h-24">
              <AvatarImage src={image} />
              <AvatarFallback>
                <Skeleton className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
            <p className="text-gray-300 font-semibold text-lg mt-2">
              {username}
            </p>
            <p className="text-gray-400 font-medium">Incoming Call...</p>

            <section className="flex items-center mt-4 space-x-4">
              <div
                className="bg-green-600 rounded-full p-2 cursor-pointer"
                onClick={handleAcceptCall}
              >
                <PhoneArrowDownLeftIcon className="w-7 h-7 text-gray-300" />
              </div>
              <div
                className="bg-red-600 rounded-full p-2 cursor-pointer"
                onClick={handleRejectCall}
              >
                <XMarkIcon className="w-7 h-7 text-gray-300" />
              </div>
            </section>
          </div>
        </main>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};
