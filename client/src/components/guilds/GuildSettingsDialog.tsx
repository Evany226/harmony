"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Guild, Member } from "@/types";
import { Button } from "../ui/button";
import { CameraIcon, PlusIcon } from "@heroicons/react/24/solid";
import AlertDialogWrapper from "../global/AlertDialogWrapper";
import { useToast } from "../ui/use-toast";
import { deleteGuild } from "@/actions/actions";
import { StyledString } from "next/dist/build/swc";
import { useSocket } from "@/context/SocketContext";

const tabs = [{ name: "Overview" }, { name: "Roles" }, { name: "Emojis" }];

interface GuildSettingsDialogProps {
  guild: Guild;
  setDialogOpen: (arg: boolean) => void;
  currentMember: Member;
}

export default function GuildSettingsDialog({
  guild,
  setDialogOpen,
  currentMember,
}: GuildSettingsDialogProps) {
  const { toast } = useToast();
  const { socket } = useSocket();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleDelete = async () => {
    try {
      const result = await deleteGuild(guild.id);
      socket.emit("deleteGuild", guild.id);
      toast({
        variant: "default",
        title: "Guild deleted",
        description: "You have successfully deleted the guild.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to delete guild",
        description:
          error.message ||
          "An error occurred while deleting the guild. Please try again later.",
      });
    }
  };

  return (
    <DialogContent className="bg-neutral-800 max-w-screen h-screen p-0">
      <div className="w-full h-full flex">
        <main className="h-full w-4/12 bg-neutral-900 flex items-center justify-end px-4">
          <section className="h-full py-2 flex flex-col mt-24 min-w-40">
            <DialogTitle className="text-gray-400 font-semibold text-sm ml-1.5">
              {guild.name}
            </DialogTitle>

            <DialogDescription asChild>
              <ul className="mt-1 w-full flex flex-col space-y-1">
                {tabs.map((tab, index) => (
                  <li
                    key={index}
                    className={`text-gray-300 font-medium text-base px-1.5 py-0.5 rounded-sm hover:bg-zinc-800 cursor-pointer ${
                      selectedTab === index ? "bg-zinc-700" : ""
                    }`}
                    onClick={() => setSelectedTab(index)}
                  >
                    {tab.name}
                  </li>
                ))}
                {currentMember.role === "OWNER" && (
                  <AlertDialogWrapper
                    variant="Guild"
                    handleDelete={handleDelete}
                    guildName={guild.name}
                  >
                    <Separator className="bg-zinc-600" />
                    <li className="flex items-center justify-between px-1.5 py-0.5 rounded-sm hover:bg-zinc-800 cursor-pointer">
                      <p className="text-red-500 font-medium text-base ">
                        Delete Server
                      </p>
                      <TrashIcon className="w-4 h-4 text-red-500 inline" />
                    </li>
                  </AlertDialogWrapper>
                )}
              </ul>
            </DialogDescription>
          </section>
        </main>

        <aside className="h-full w-8/12 bg-neutral-800 ">
          {selectedTab === 0 && (
            <OverviewTab setDialogOpen={setDialogOpen} guild={guild} />
          )}
          {selectedTab === 1 && (
            <div>
              <h2 className="text-gray-300">Roles</h2>
              {/* Add roles content here */}
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <h2 className="text-gray-300">Emojis</h2>
              {/* Add emojis content here */}
            </div>
          )}
        </aside>
      </div>
    </DialogContent>
  );
}

interface OverviewTabProps {
  guild: Guild;
  setDialogOpen: (arg: boolean) => void;
}

function OverviewTab({ guild, setDialogOpen }: OverviewTabProps) {
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string>(guild.imageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileObject(file);
      setFileURL(URL.createObjectURL(file));
    }
  };

  return (
    <form className="w-3/5 h-full pt-12 px-6 flex flex-col space-y-6">
      <div className="flex flex-col space-y-1 ">
        <h2 className="text-gray-300 text-xl font-semibold">Guild Overview</h2>
        <p className="text-gray-400 text-sm font-medium">
          This is an overview of your guild. Remember to save any changes you
          make.
        </p>
      </div>

      <main className="w-full flex space-x-4 ">
        <div className="w-1/4 flex flex-col justify-center items-center">
          <div className="h-24 w-24 rounded-full border-2 border-dashed flex flex-col items-center justify-center relative">
            <CameraIcon className="h-6 w-6 text-gray-300" />
            <p className="text-gray-300 text-xs font-semibold">UPLOAD</p>
            <div className="absolute top-0 right-0 rounded-full bg-purple-700">
              <PlusIcon className="h-5 w-5 text-gray-300" />
            </div>
          </div>
        </div>
        <div className="w-3/4 flex flex-col mt-2">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm font-semibold">
              SERVER NAME
            </label>
            <input
              className="outline-0 rounded-md w-full text-sm bg-neutral-900 py-2 px-3 text-gray-300"
              placeholder="New Category"
              name="name"
              defaultValue={guild.name}
            ></input>
          </div>
        </div>
      </main>

      <Separator className="bg-zinc-600" />
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="px-3 py-1 ml-2 rounded-sm bg-purple-700 border-0 text-gray-300 hover:bg-purple-800 hover:text-white"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
