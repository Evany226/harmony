"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { formatDateTime } from "@/lib/utils";
import {
  PencilIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import { Message, ChannelMessages } from "@/types";
import EditMessageDropdown from "./EditMessageDropdown";
import { useToast } from "../ui/use-toast";
import { editMessage, editChannelMessage } from "@/actions/actions";
import { useSocket } from "@/context/SocketContext";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

interface MessageCardProps {
  message: Message | ChannelMessages;
  variant: "channel" | "conversation";
}

export default function MessageCard({ message, variant }: MessageCardProps) {
  const sender = message.sender?.user;
  const { toast } = useToast();

  const { socket } = useSocket();
  const { userId } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsEditing(false);
        }
      });
    }
  }, [isEditing]);

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setIsEditing(false);

    try {
      const result = await editMessage(message.id, formData);
      socket.emit(`editMessage`, result);
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

  const handleChannelMessageSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setIsEditing(false);

    try {
      const result = await editChannelMessage(message.id, formData);
      socket.emit(`editChannelMessage`, result);
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

  if (message.isAlert) {
    return (
      <div className="flex items-center w-full py-2 px-5 space-x-2">
        <ArrowLongRightIcon className="h-5 w-5 text-indigo-500" />
        <p className="font-medium text-gray-300 sm:text-sm">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`group flex w-full items-center overflow-0 break-all mb-4 px-5 py-1 relative hover:bg-neutral-800 ${
        isEditing ? "bg-neutral-800" : ""
      }`}
    >
      <Avatar className="w-10 h-10 sm:w-8 sm:h-8">
        <AvatarImage src={sender.imageUrl} />
        <AvatarFallback>
          <Skeleton className="w-full h-full" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-4">
        <div className="flex items-center space-x-3">
          <p className="font-semibold text-gray-300 sm:text-sm">
            {sender.username}
          </p>
          <p className="text-gray-400 text-sm font-medium sm:text-xs">
            {formatDateTime(message.createdAt)}
          </p>
          {message.edited && (
            <p className="text-gray-300 text-sm font-medium">(edited)</p>
          )}
        </div>
        {isEditing ? (
          <EditMessageDropdown
            handleSubmit={
              variant === "conversation"
                ? handleMessageSubmit
                : handleChannelMessageSubmit
            }
            setIsEditing={setIsEditing}
            initialValue={message.content}
          />
        ) : (
          <p className="font-normal text-gray-300 sm:text-sm">
            {message.content}
          </p>
        )}
      </div>
      <div className="absolute -top-2 right-5 hidden group-hover:block">
        <div className="flex items-center bg-zinc-900 space-x-2 py-1 px-2 rounded-md border border-zinc-700">
          <FaceSmileIcon className="h-5 w-5 text-gray-300 cursor-pointer hover:text-gray-500" />
          {message.sender.userId === userId && (
            <PencilIcon
              onClick={() => setIsEditing(!isEditing)}
              className="h-5 w-5 text-gray-300 cursor-pointer hover:text-gray-500"
            />
          )}
          <EllipsisHorizontalIcon className="h-5 w-5 text-gray-300 cursor-pointer hover:text-gray-500" />
        </div>
      </div>
    </div>
  );
}
