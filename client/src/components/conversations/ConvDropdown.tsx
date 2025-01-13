"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UsersIcon } from "@heroicons/react/24/solid";
import ConvDropdownItem from "./ConvDropdownItem";
import { getAllFriends } from "@/lib/friends";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Friend, User, Participant } from "@/types";
import { Button } from "../ui/button";
import { createConversation } from "@/actions/actions";
import { useToast } from "../ui/use-toast";
import { socket } from "@/app/socket";
import { ScrollArea } from "../ui/scroll-area";
import Loading from "../global/Loading";
import { useFriend } from "@/context/FriendContext";

export default function ConvDropdown({
  children,
}: {
  children: React.ReactNode;
}) {
  const { friends } = useFriend();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    let isAnyCheckboxSelected = false;
    for (let value of formData.values()) {
      if (value) {
        isAnyCheckboxSelected = true;
        break;
      }
    }

    if (!isAnyCheckboxSelected) {
      toast({
        variant: "destructive",
        title: "No friends selected",
        description:
          "Please select at least one friend to create a conversation.",
      });
      return;
    }

    try {
      setModalOpen(false);
      const result = await createConversation(formData);
      socket.emit("joinConversation", {
        conversationId: result.id,
        participantIds: result.participants.map(
          (participant: Participant) => participant.userId
        ),
      });

      toast({
        variant: "default",
        title: "Conversation created",
        description: "You have successfully created a conversation.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create conversation",
        description:
          error.message ||
          "An error occurred while creating the conversation. Please try again later.",
      });
    }
  };

  return (
    <DropdownMenu open={modalOpen} onOpenChange={setModalOpen}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        alignOffset={12}
        className="bg-zinc-800 px-4 py-2 min-w-64 sm:w-[90vw]"
      >
        <DropdownMenuLabel className="text-lg px-0 ">
          Select Friends
        </DropdownMenuLabel>
        <p className="text-gray-300 text-sm sm:hidden">
          You can select a maximum of 10 friends to start a conversation.
        </p>
        <div className="w-full my-2">
          <input
            className="w-full outline-0 bg-zinc-900 text-gray-200 py-1.5 px-2 rounded-sm text-sm placeholder-gray-400"
            placeholder="Type the username of a friend."
          ></input>
        </div>
        <form onSubmit={handleSubmit}>
          <Loading isLoading={isLoading}>
            <ScrollArea className="w-full h-40 top-0 left-0 px-2">
              {friends.length > 0 ? (
                friends.map((friend) => {
                  return (
                    <ConvDropdownItem
                      id={friend.id}
                      key={friend.id}
                      username={friend.username}
                      imageUrl={friend.imageUrl}
                    />
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center mt-6">
                  <UsersIcon className="w-6 text-gray-400" />
                  <h2 className="text-gray-400 text-sm font-medium">
                    You have no friends
                  </h2>
                </div>
              )}
            </ScrollArea>
          </Loading>
          <Button type="submit" variant="outline" className="w-full py-1 mt-4 ">
            <p className="text-black font-medium">Create DM</p>
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
