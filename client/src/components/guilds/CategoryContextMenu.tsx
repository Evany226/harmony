"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import EditCategoryDialog from "./EditCategoryDialog";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { updateCategory, deleteCategory } from "@/actions";

export default function CategoryContextMenu({
  children,
  name,
  categoryId,
}: {
  children: React.ReactNode;
  name: string;
  categoryId: string;
}) {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (formData.get("name") === "") {
      toast({
        variant: "destructive",
        title: "Failed to update category",
        description:
          "The category name field cannot be empty. Please enter a valid category name.",
      });
      return;
    }

    if (formData.get("name") === name) {
      toast({
        variant: "destructive",
        title: "No changes made",
        description: "You have not made any changes to the category name.",
      });
      return;
    }

    try {
      setDialogOpen(false);
      const result = await updateCategory(formData, categoryId);
      toast({
        variant: "default",
        title: "Category updated",
        description: "You have successfully updated the category.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update category",
        description:
          error.message ||
          "An error occurred while updating the category. Please try again later.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(categoryId);
      toast({
        variant: "default",
        title: "Category deleted",
        description: "You have successfully deleted the category.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to delete category",
        description:
          error.message ||
          "An error occurred while deleting the category. Please try again later.",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="bg-zinc-800 border-zinc-700 px-2 py-1">
          <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <ContextMenuItem
              onClick={(e) => e.stopPropagation()}
              className="text-gray-300 text-sm focus:bg-zinc-700 focus:text-white cursor-pointer"
            >
              Edit Category
            </ContextMenuItem>
          </DialogTrigger>
          <ContextMenuItem
            onClick={(e) => e.stopPropagation()}
            className="text-red-500 text-sm focus:bg-zinc-700 focus:text-white focus:bg-red-500 cursor-pointer"
          >
            Delete Category
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <EditCategoryDialog
        setDialogOpen={setDialogOpen}
        name={name}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      />
    </Dialog>
  );
}
