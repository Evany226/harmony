"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Separator } from "../../ui/separator";
import { Friend } from "@/types";
import { TooltipWrapper } from "../../global/TooltipWrapper";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from "@/lib/friends";
import { useToast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";
import { Dropdown } from "../../global/Dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { useSocket } from "@/context/SocketContext";
import ConnectionStatus from "@/components/global/ConnectionStatus";

interface FriendsProps {
  friend: Friend;
  pending: boolean;
  status: boolean;
}

interface FriendsWrapperProps {
  friends: Friend[];
  variant: "Online" | "All" | "Pending" | "Blocked";
}

export function Friends({ friend, pending, status }: FriendsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleAccept = async (id: string) => {
    try {
      const result = await acceptFriendRequest(id);
      router.refresh();
      toast({
        variant: "default",
        title: "Accepted friend request!",
        description:
          "Your friend request has been successfully accepted. You can now chat with your new friend!",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to accept friend request",
        description:
          error.message ||
          "An error occurred while accepting your friend request. Please try again later",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const result = await rejectFriendRequest(id);
      router.refresh();
      toast({
        variant: "default",
        title: "Rejected friend request!",
        description: "Your friend request has been successfully rejected.",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to reject friend request",
        description:
          error.message ||
          "An error occurred while rejecting your friend request. Please try again later",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await removeFriend(id);
      router.refresh();
      toast({
        variant: "default",
        title: "Friend removed!",
        description: "Your friend has been successfully removed.",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to remove friend",
        description:
          error.message ||
          "An error occurred while removing your friend. Please try again later",
      });
    }
  };

  return (
    <div className="flex flex-col w-full bg-zinc-900 rounded-sm hover:bg-zinc-800 group cursor-pointer">
      <main className="flex items-center w-full justify-between">
        <div className="flex items-center w-full py-3 px-2">
          <div className="relative">
            <Avatar>
              <AvatarImage src={friend.imageUrl} />
              <AvatarFallback>
                <Skeleton className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
            <ConnectionStatus isConnected={status} />
          </div>
          <div>
            <h2 className="text-gray-400 ml-3">{friend.username}</h2>
          </div>
        </div>

        <aside className="flex items-center mr-2">
          {pending ? (
            <>
              <TooltipWrapper text="Accept">
                <button
                  onClick={() => handleAccept(friend.requestId)}
                  className="bg-zinc-800 mr-2 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900"
                >
                  <CheckIcon className="w-6 text-gray-400" />
                </button>
              </TooltipWrapper>
              <TooltipWrapper text="Reject">
                <button
                  onClick={() => handleReject(friend.requestId)}
                  className="bg-zinc-800 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900"
                >
                  <XMarkIcon className="w-6 text-gray-400" />
                </button>
              </TooltipWrapper>
            </>
          ) : (
            <>
              <TooltipWrapper text="Message">
                <div className="bg-zinc-800 mr-2 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900 ">
                  <ChatBubbleOvalLeftIcon className="w-6 text-gray-400" />
                </div>
              </TooltipWrapper>

              <Dropdown removeFriend={() => handleDelete(friend.requestId)}>
                <div className="bg-zinc-800 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900">
                  <EllipsisVerticalIcon className="w-6 text-gray-400" />
                </div>
              </Dropdown>
            </>
          )}
        </aside>
      </main>
      <Separator orientation="horizontal" />
    </div>
  );
}

export default function FriendsWrapper({
  friends,
  variant,
}: FriendsWrapperProps) {
  const { onlineUsers } = useSocket();

  const onlineFriends = friends.filter((friend) =>
    onlineUsers.includes(friend.id)
  );

  if (variant !== "Online") {
    return (
      <>
        <section className="flex-col w-full h-full">
          <div className="flex flex-col justify-start">
            <h2 className="text-gray-400 text-sm font-medium mb-2 ml-2">
              {variant} - {friends.length}
            </h2>
            <Separator orientation="horizontal" />
          </div>

          <div className="flex-col">
            {friends.map((friend) => {
              const onlineStatus = onlineUsers.includes(friend.id);

              return (
                <Friends
                  key={friend.id}
                  friend={friend}
                  pending={variant === "Pending"}
                  status={onlineStatus}
                />
              );
            })}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="flex-col w-full h-full">
        <div className="flex flex-col justify-start">
          <h2 className="text-gray-400 text-sm font-medium mb-2 ml-2">
            {variant} - {onlineFriends.length}
          </h2>
          <Separator orientation="horizontal" />
        </div>

        <div className="flex-col">
          {onlineFriends.map((friend) => {
            const onlineStatus = onlineUsers.includes(friend.id);

            return (
              <Friends
                key={friend.id}
                friend={friend}
                pending={false}
                status={onlineStatus}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
