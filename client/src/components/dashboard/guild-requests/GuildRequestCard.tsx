"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TooltipWrapper } from "@/components/global/TooltipWrapper";
import { GuildRequest, Guild } from "@/types";

import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSocket } from "@/context/SocketContext";

import { acceptGuildRequest, rejectGuildRequest } from "@/lib/guilds";

interface GuildRequestCardProps {
  guild: Guild;
  requestId: string;
}

function GuildRequestCard({ guild, requestId }: GuildRequestCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  const { socket } = useSocket();

  const handleAccept = async (id: string) => {
    try {
      const result = await acceptGuildRequest(id);
      router.refresh();
      socket.emit("joinGuild", guild.id);
      toast({
        variant: "default",
        title: "Accepted guild request!",
        description:
          "You have successfully accepted the guild request. You can view your guild on the left sidebar.",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to accept guild request",
        description:
          error.message ||
          "An error occurred while accepting the guild request. Please try again later.",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const result = await rejectGuildRequest(id);
      router.refresh();
      toast({
        variant: "default",
        title: "Rejected guild request!",
        description: "You have rejected the guild request.",
      });
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to reject guild request",
        description:
          error.message ||
          "An error occurred while rejecting the guild request. Please try again later.",
      });
    }
  };

  return (
    <div className="flex flex-col w-full bg-zinc-900 rounded-sm hover:bg-zinc-800 group cursor-pointer">
      <main className="flex items-center w-full justify-between">
        <div className="flex items-center w-full py-3 px-2">
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <Skeleton className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="text-gray-400 ml-3">{guild.name}</h2>
          </div>
        </div>

        <aside className="flex items-center mr-2">
          <TooltipWrapper text="Accept">
            <button
              onClick={() => handleAccept(requestId)}
              className="bg-zinc-800 mr-2 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900"
            >
              <CheckIcon className="w-6 text-gray-400" />
            </button>
          </TooltipWrapper>
          <TooltipWrapper text="Reject">
            <button
              onClick={() => handleReject(requestId)}
              className="bg-zinc-800 rounded-2xl p-1.5 cursor-pointer group-hover:bg-neutral-900"
            >
              <XMarkIcon className="w-6 text-gray-400" />
            </button>
          </TooltipWrapper>
        </aside>
      </main>
      <Separator orientation="horizontal" />
    </div>
  );
}

export default function GuildRequestWrapper({
  pendingRequests,
}: {
  pendingRequests: GuildRequest[];
}) {
  return (
    <section className="flex-col w-full h-full">
      <div className="flex flex-col justify-start">
        <h2 className="text-gray-400 text-sm font-medium mb-2 ml-2">
          Pending - {pendingRequests.length}
        </h2>
        <Separator orientation="horizontal" />
      </div>

      <div className="flex-col">
        {pendingRequests.map((request: GuildRequest) => {
          return (
            <GuildRequestCard
              key={request.id}
              requestId={request.id}
              guild={request.fromGuild}
            />
          );
        })}
      </div>
    </section>
  );
}
