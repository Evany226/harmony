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
import { Separator } from "../ui/separator";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";

import GuildDialogFooter from "./GuildDialogFooter";

import { getFirstChannel } from "@/lib/guilds";
import { updateChannel } from "@/actions";

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
  const { toast } = useToast();

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

  const handleDelete = async () => {
    await deleteChannel(id).then(() => {
      if (pathname === `/guilds/${guildId}/${id}`) {
        router.push(redirectLink);
      }
    });
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
            setDialogOpen={setDialogOpen}
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
