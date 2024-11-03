"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteChannel, updateChannel } from "@/actions/actions";
import TextareaAutosize from "react-textarea-autosize";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { useSocket } from "@/context/SocketContext";

import GuildDialogFooter from "../GuildDialogFooter";

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
  const { toast } = useToast();
  const { socket } = useSocket();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteChannel(id);
      socket.emit(`deleteChannel`, id);
      toast({
        variant: "default",
        title: "Channel deleted",
        description: "You have successfully deleted the channel.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to delete channel",
        description:
          error.message ||
          "An error occurred while deleting the channel. Please try again later.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (formData.get("name") === "") {
      toast({
        variant: "destructive",
        title: "Failed to edit channel",
        description:
          "The channel name field cannot be empty. Please enter a valid channel name.",
      });
    }

    try {
      setDialogOpen(false);
      // Call the updateChannel function here
      const result = await updateChannel(formData, id);
      socket.emit("refresh", guildId);
      toast({
        variant: "default",
        title: "Channel updated",
        description: "You have successfully updated the channel.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update channel",
        description:
          error.message ||
          "An error occurred while updating the channel. Please try again later.",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen} modal={true}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-gray-300">Edit Channel</DialogTitle>
          <DialogDescription>
            Make changes to your channel here. Click save when finished.
          </DialogDescription>
        </DialogHeader>
        <form className=" w-full flex flex-col" onSubmit={handleSubmit}>
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

          <Separator className="mt-4" />
          <GuildDialogFooter
            dialogFunc={() => setDialogOpen(false)}
            handleDelete={handleDelete}
            text="Save"
            hasDelete={true}
            variant="Channel"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
