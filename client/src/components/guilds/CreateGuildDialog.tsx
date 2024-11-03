"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import GuildDialogFooter from "./GuildDialogFooter";

import { XMarkIcon } from "@heroicons/react/24/solid";

import { CameraIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { createNewGuild } from "@/actions/actions";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import Image from "next/image";

export default function CreateGuildDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [fileURL, setFileURL] = useState<string>("");

  const [fileObject, setFileObject] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      setFileObject(e.target.files[0]);
      setFileURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveFile = () => {
    setFileURL("");
    setFileObject(null);
  };

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

    if (fileObject) {
      formData.append("photos", fileObject);
    }

    const photos = formData.get("photos");

    console.log(photos);

    if (!photos || !(photos instanceof File) || photos.size === 0) {
      toast({
        variant: "destructive",
        title: "Failed to create guild",
        description:
          "Please upload a guild image. The image field cannot be empty.",
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
    } finally {
      setFileURL("");
      setFileObject(null);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className="bg-zinc-800"
        onPointerDownOutside={() => handleRemoveFile()}
        onEscapeKeyDown={() => handleRemoveFile()}
      >
        <DialogHeader>
          <DialogTitle className="text-gray-300 ">
            Create Your Guild
          </DialogTitle>
          <DialogDescription>
            Your guild is where you and your friends hangout. Make yours and
            start talking. The guild image must be a .jpg, .png, or .jpeg file.
          </DialogDescription>
          <DialogClose
            onClick={() => {
              console.log("hello");
            }}
          />
        </DialogHeader>
        <form
          className="w-full flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="h-20 w-20 rounded-full border-2 flex flex-col items-center justify-center relative cursor-pointer">
              {fileURL ? (
                <Image
                  src={fileURL}
                  alt="guild-image"
                  width={80}
                  height={80}
                  className="rounded-full w-full h-full"
                />
              ) : (
                <>
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center"
                  >
                    <CameraIcon className="h-6 w-6 text-gray-300 cursor-pointer" />
                    <p className="text-gray-300 text-xs font-semibold cursor-pointer">
                      UPLOAD
                    </p>
                    <input
                      accept=".jpg,.png,.jpeg"
                      type="file"
                      id="file-upload"
                      name="photos"
                      className="absolute -z-1 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    ></input>
                    <div className="absolute top-0 right-0 rounded-full bg-purple-700">
                      <PlusIcon className="h-5 w-5 text-gray-300" />
                    </div>
                  </label>
                </>
              )}
            </div>
            {fileObject && (
              <div className="flex items-center">
                <p className="text-gray-300 font-normal ">{fileObject.name}</p>
                <XMarkIcon
                  className="h-4 w-4 text-gray-300 cursor-pointer ml-2"
                  onClick={handleRemoveFile}
                />
              </div>
            )}
          </div>

          <aside className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm font-semibold">
              SERVER NAME
            </label>
            <input
              className="outline-0 rounded-md w-full text-sm bg-neutral-900 py-2 px-3 text-gray-300"
              placeholder="Enter a server name."
              name="name"
            ></input>
          </aside>

          <GuildDialogFooter
            dialogFunc={() => {
              setDialogOpen(false);
              setFileURL("");
              setFileObject(null);
            }}
            text="Create"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
