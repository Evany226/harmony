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
import InviteDialogItem from "./InviteDialogItem";
import { createGuildRequest } from "@/actions";

export default function InviteDialog({ guildId }: { guildId: string }) {
  const { getToken } = useAuth();
  const { toast } = useToast();
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
      const result = await createGuildRequest(username, guildId);
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
        <Button type="submit" variant="outline" className="w-full py-1 mt-4 ">
          <p className="text-black font-medium">Create DM</p>
        </Button>
      </form>
    </DialogContent>
  );
}
