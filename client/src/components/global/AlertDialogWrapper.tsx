"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { useState } from "react";

export default function AlertDialogWrapper({
  children,
  handleDelete,
  variant,
  guildName,
}: {
  children: React.ReactNode;
  handleDelete: () => void;
  variant: "Category" | "Channel" | "Guild";
  guildName?: string;
}) {
  const [userInput, setUserInput] = useState<string>("");
  const [isFormError, setIsFormError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInput !== guildName) {
      setIsFormError(true);
      setTimeout(() => {
        setIsFormError(false);
      }, 5000);
      return;
    }

    handleDelete();
  };

  if (variant === "Guild" && guildName) {
    return (
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent className="bg-zinc-950 border border-zinc-700">
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-300">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                <p>
                  This action cannot be undone. This will{" "}
                  <span className="font-bold text-red-600">
                    permanently delete
                  </span>{" "}
                  your guild as well as ALL categories, channels, and messages
                  associated with it.
                </p>

                <div className="flex flex-col space-y-2 my-4">
                  <label className="text-gray-300 text-sm font-semibold">
                    ENTER GUILD NAME
                  </label>
                  <input
                    className="outline-0 rounded-md w-full text-sm bg-neutral-900 py-2 px-3 text-gray-300"
                    placeholder="guild-name"
                    name="name"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  ></input>
                  {isFormError && (
                    <p className="text-red-400 text-xs ml-2 mt-1">
                      You didnt enter the server name correctly.
                    </p>
                  )}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                className="group bg-red-700 hover:bg-red-900"
                type="submit"
              >
                <p className="text-gray-300 group-hover:text-white">Delete</p>
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-950 border border-zinc-700 ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-300">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            {variant === "Channel" ? (
              <p>
                This action cannot be undone. This will{" "}
                <span className="font-bold text-red-600">
                  permanently delete
                </span>{" "}
                your channel and remove any corresponding messages.
              </p>
            ) : (
              <p>
                This action cannot be undone. This will{" "}
                <span className="font-bold text-red-600">
                  permanently delete
                </span>{" "}
                your category as well as ALL channels and messages associated
                with it.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-gray-300 bg-red-700 hover:bg-red-900"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
