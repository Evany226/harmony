import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import GuildDialogFooter from "../GuildDialogFooter";
import { Separator } from "@/components/ui/separator";

export default function EditCategoryDialog({
  setDialogOpen,
  name,
  handleSubmit,
  handleDelete,
}: {
  setDialogOpen: (arg: boolean) => void;
  name: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDelete: () => void;
}) {
  return (
    <DialogContent
      onClick={(e) => e.stopPropagation()}
      className="bg-zinc-800"
      onPointerDownOutside={(e) => e.stopPropagation()}
    >
      <DialogHeader>
        <DialogTitle className="text-gray-300">Category Overview</DialogTitle>
        <DialogDescription>
          Make changes to your category here. Click save when finished.
        </DialogDescription>
      </DialogHeader>
      <form className=" w-full flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-300 text-sm font-semibold">
            CHANNEL NAME
          </label>
          <input
            className="outline-0 rounded-sm w-full text-sm bg-neutral-900 py-2 px-3 text-gray-300"
            placeholder="Category Name"
            name="name"
            defaultValue={name}
          ></input>
        </div>

        <Separator className="mt-4" />
        <GuildDialogFooter
          setDialogOpen={setDialogOpen}
          text="Save"
          hasDelete={true}
          handleDelete={handleDelete}
          variant="Category"
        />
      </form>
    </DialogContent>
  );
}
