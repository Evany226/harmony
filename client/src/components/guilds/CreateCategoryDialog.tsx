"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GuildDialogFooter from "./GuildDialogFooter";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { createCategory } from "@/actions";
import React from "react";

interface CreateCategoryDialogProps {
  guildId: string;
  children: React.ReactNode;
}

export default function CreateCategoryDialog({
  guildId,
  children,
}: CreateCategoryDialogProps) {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("guildId", guildId);

    if (formData.get("name") === "") {
      toast({
        variant: "destructive",
        title: "Failed to create category",
        description:
          "The category name field cannot be empty. Please enter a valid category name.",
      });
    }

    try {
      setDialogOpen(false);
      const result = await createCategory(formData);
      toast({
        variant: "default",
        title: "Category created",
        description: "You have successfully created a category.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create category",
        description:
          error.message ||
          "An error occurred while creating the category. Please try again later.",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-gray-300 ">Create Category</DialogTitle>
          <DialogDescription>
            A category is where you bundle your channels. You can customize it
            however you want.
          </DialogDescription>
        </DialogHeader>
        <form className=" w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm font-semibold">
              CATEGORY NAME
            </label>
            <input
              className="outline-0 rounded-md w-full text-sm bg-neutral-900 py-2 px-3 text-gray-300"
              placeholder="New Category"
              name="name"
            ></input>
          </div>

          <GuildDialogFooter
            text="Create"
            setDialogOpen={setDialogOpen}
            variant="Category"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
