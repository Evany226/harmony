"use client";

import { useState, useContext, createContext } from "react";
import Image from "next/image";
import { PhoneArrowDownLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useAudio } from "./AudioContext";
import { socket } from "@/app/socket";

interface VoiceCallContextProps {
  createAlert(username: string, conversationId: string, imageUrl: string): void;
  isVoiceCallOpen: boolean;
  setIsVoiceCallOpen: (value: boolean) => void;
}

const VoiceCallContext = createContext<VoiceCallContextProps | undefined>(
  undefined
);

export const VoiceCallProvider = ({
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
  const [conversationId, setConversationId] = useState<string>("");
  const { playCallSound, stopCallSound, playJoinSound } = useAudio();

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
    router.push(`/home/conversations/${conversationId}`);
    setIsVoiceCallOpen(true);
    setAlert(false);
    stopCallSound();
    playJoinSound();
    socket.emit("joinVoiceCall", conversationId);
  };

  const handleRejectCall = () => {
    setIsVoiceCallOpen(false);
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
    <VoiceCallContext.Provider value={value}>
      {children}

      {alert && (
        <main className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center justify-center px-8 py-4 rounded-md bg-zinc-950 animate-pulse">
            <div className="w-24 h-24 relative">
              <Image
                src={image}
                alt="Calling user profile picture"
                fill
                className="rounded-full"
              />
            </div>
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
    </VoiceCallContext.Provider>
  );
};

export const useVoiceCall = () => {
  const context = useContext(VoiceCallContext);

  if (context === undefined) {
    throw new Error("useVoiceCall must be used within a VoiceCallProvider");
  }

  return context;
};
