"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import { Friend } from "@/types";
import { getAllFriends } from "@/lib/friends";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import { useSocket } from "@/context/SocketContext";

import { createGuildRequest } from "@/actions/actions";
import { ScrollArea } from "../ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface InviteDialogItemProps {
  id: string;
  friendName: string;
  imageUrl: string;
  username: string;
  setUsername(arg: string): void;
}

function InviteDialogItem({
  id,
  friendName,
  imageUrl,
  username,
  setUsername,
}: InviteDialogItemProps) {
  return (
    <div
      onClick={() => setUsername(friendName)}
      className="w-full flex items-center flex-between group hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer"
    >
      <div className="w-full flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <Skeleton className="w-full h-full" />
          </AvatarFallback>
        </Avatar>
        <label className="w-full text-base text-gray-300 group-hover:text-white outline-0 cursor-pointer">
          {friendName}
        </label>
      </div>
      <input
        type="radio"
        name={id}
        checked={username === friendName}
        onChange={() => setUsername(friendName)}
        className="w-4 h-4 accent-blue-500 border-gray-300 rounded-md"
      />
    </div>
  );
}

export default function InviteDialog({
  guildId,
  setDialogOpen,
}: {
  guildId: string;
  setDialogOpen: (arg: boolean) => void;
}) {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const { socket } = useSocket();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchFriends = async () => {
      const token = await getToken();
      const response = await getAllFriends(token as string);
      setFriends(response);
    };

    fetchFriends();
  }, [getToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      toast({
        title: "No friend selected",
        description: "Please select a friend to invite.",
        variant: "destructive",
      });
      return;
    }

    try {
      setDialogOpen(false);
      const result = await createGuildRequest(username, guildId);
      socket.emit("inviteRefresh", result.toUserId);
      toast({
        title: "Invitation sent!",
        description: `You have invited ${username} to the guild.`,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error sending invitation",
        description:
          error.message || "An error occurred while sending the invitation.",
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent className="bg-zinc-800">
      <DialogHeader>
        <DialogTitle className="text-gray-300 text-lg px-0 ">
          Invite Friends
        </DialogTitle>
        <DialogDescription className="text-gray-300 text-sm ">
          You can select a maximum of 10 friends to start a conversation.
        </DialogDescription>
      </DialogHeader>
      <div className="w-full">
        <input
          className="w-full outline-0 bg-zinc-900 text-gray-200 py-1.5 px-2 rounded-sm text-sm placeholder-gray-400"
          placeholder="Type the username of a friend."
        ></input>
      </div>
      <form onSubmit={handleSubmit}>
        <ScrollArea className="w-full h-40 px-2 my-2">
          {friends.map((friend) => {
            return (
              <InviteDialogItem
                id={friend.id}
                key={friend.id}
                friendName={friend.username}
                imageUrl={friend.imageUrl}
                username={username}
                setUsername={setUsername}
              />
            );
          })}
        </ScrollArea>
        <Button type="submit" variant="outline" className="w-full py-1 mt-4 ">
          <p className="text-black font-medium">Send Invite</p>
        </Button>
      </form>
    </DialogContent>
  );
}
