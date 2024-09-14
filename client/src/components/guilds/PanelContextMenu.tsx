"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import CreateCategoryDialog from "./CreateCategoryDialog";
import CategoryWrapper from "@/components/guilds/CategoryWrapper";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Guild, Category } from "@/types";
import { useState } from "react";

interface PanelContextMenu {
  guild: Guild;
  guildId: string;
}

export default function PanelContextMenu({ guild, guildId }: PanelContextMenu) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <ContextMenu>
        <ContextMenuTrigger className="flex flex-col h-[calc(100%-7rem)] px-2 py-2 max-w-64 space-y-4 mt-2">
          {guild.categories.map((category: Category) => (
            <CategoryWrapper
              key={category.id}
              name={category.name}
              channels={category.channels}
              guildId={guildId}
              categoryId={category.id}
            />
          ))}
        </ContextMenuTrigger>
        <ContextMenuContent className="bg-zinc-800 border-zinc-700 px-2 py-1">
          <DialogTrigger>
            <ContextMenuItem className="text-gray-300 text-sm focus:bg-zinc-700 focus:text-white">
              Create Category
            </ContextMenuItem>
          </DialogTrigger>
          <ContextMenuItem className="text-gray-300 text-sm focus:bg-zinc-700 focus:text-white">
            Create Channel
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <CreateCategoryDialog guildId={guildId} setDialogOpen={setDialogOpen} />
    </Dialog>
  );
}
