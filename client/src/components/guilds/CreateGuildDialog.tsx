"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CameraIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { createNewGuild } from "@/actions";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

export default function CreateGuildDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (!formData.get("name")) {
      toast({
        variant: "destructive",
        title: "Failed to create guild",
        description:
          "The guild name field cannot be empty. Please enter a valid guild name.",
      });
      return;
    }

    try {
      setDialogOpen(false);
      const result = await createNewGuild(formData);
      toast({
        variant: "default",
        title: "Guild created",
        description: "You have successfully created a guild.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create guild",
        description:
          error.message ||
          "An error occurred while creating the guild. Please try again later.",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-gray-300 ">
            Create Your Server
          </DialogTitle>
          <DialogDescription>
            Your server is where you and your friends hangout. Make yours and
            start talking.
          </DialogDescription>
        </DialogHeader>
        <form className=" w-full flex flex-col" onSubmit={handleSubmit}>
          <main className="w-full flex justify-center">
            <div className="h-20 w-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center relative">
              <CameraIcon className="h-6 w-6 text-gray-300" />
              <p className="text-gray-300 text-xs font-semibold">UPLOAD</p>
              <div className="absolute top-0 right-0 rounded-full bg-purple-700">
                <PlusIcon className="h-5 w-5 text-gray-300" />
              </div>
            </div>
          </main>

          <aside className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm font-semibold">
              SERVER NAME
            </label>
            <input
              className="outline-0 rounded-md w-full text-sm bg-zinc-900 py-2 px-3 text-gray-300"
              placeholder="Enter a server name."
              name="name"
            ></input>
          </aside>

          <div className="w-full flex justify-end mt-4">
            <Button variant="outline" className="px-3 py-1 rounded-sm">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
