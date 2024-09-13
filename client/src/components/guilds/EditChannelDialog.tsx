"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteChannel } from "@/actions";
import TextareaAutosize from "react-textarea-autosize";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@clerk/nextjs";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import GuildDialogFooter from "./GuildDialogFooter";

import { getFirstChannel } from "@/lib/guilds";

interface EditChannelDialogProps {
  id: string;
  guildId: string;
  name: string;
  children: React.ReactNode;
}

export default function EditChannelDialog({
  id,
  guildId,
  name,
  children,
}: EditChannelDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { getToken } = useAuth();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [redirectLink, setRedirectLink] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const firstChannel = await getFirstChannel(token as string, guildId);
      console.log(firstChannel);
      setRedirectLink(firstChannel);
    };

    fetchData();
  }, [getToken, guildId]);

  const onDelete = async () => {
    await deleteChannel(id).then(() => {
      if (pathname === `/guilds/${guildId}/${id}`) {
        router.push(redirectLink);
      }
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-gray-300">Edit Channel</DialogTitle>
          <DialogDescription>
            Make changes to your channel here. Click save when finished.
          </DialogDescription>
        </DialogHeader>
        <form className=" w-full flex flex-col">
          <main className="w-full flex flex-col justify-center space-y-6 mb-2">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm font-semibold">
                CHANNEL NAME
              </label>
              <input
                className="outline-0 rounded-sm w-full text-sm bg-neutral-900 py-2 px-3 text-gray-300"
                placeholder="New Category"
                name="name"
                defaultValue={name}
              ></input>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm font-semibold">
                CHANNEL TOPIC
              </label>
              <TextareaAutosize
                className="outline-0 rounded-sm w-full text-sm bg-neutral-900 py-2 px-3 text-gray-300 resize-none"
                placeholder="Let everyone know how to use this channel!"
                name="topic"
                minRows={2}
                maxRows={5}
              />
            </div>
          </main>

          <GuildDialogFooter setDialogOpen={setDialogOpen} text="Save" />
        </form>

        <div className="flex flex-col w-full space-y-2">
          <h1 className="text-gray-300 text-sm font-bold">DELETE CHANNEL</h1>
          <div className="bg-red-950 border border-red-800 px-4 py-2 rounded-sm">
            <p className="text-gray-300 text-xs">
              This action cannot be undone.
            </p>
            <button
              className="text-xs bg-rose-800 border border-red-700 hover:bg-rose-700 px-1 py-1 mt-1 rounded-sm text-gray-300 font-medium"
              onClick={onDelete}
            >
              Delete Channel
              <TrashIcon className="w-4 inline-block ml-1" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
