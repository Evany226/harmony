import { Button } from "../ui/button";
import { TrashIcon } from "@heroicons/react/24/solid";
import AlertDialogWrapper from "../global/AlertDialogWrapper";

export default function GuildDialogFooter({
  text,
  dialogFunc,
  hasDelete,
  handleDelete,
  variant,
}: {
  dialogFunc?: () => void;
  text: string;
  hasDelete?: boolean;
  handleDelete?: () => void;
  variant?: "Category" | "Channel";
}) {
  return (
    <div className="w-full flex justify-between mt-4 space-x-2 ">
      <div className="flex items-center">
        {hasDelete && handleDelete && variant && (
          <AlertDialogWrapper handleDelete={handleDelete} variant={variant}>
            <span className="text-sm bg-red-700 hover:bg-red-900 hover:text-white px-3 py-1 mt-1 rounded-sm text-gray-300 font-medium">
              {`Delete ${variant}`}
              <TrashIcon className="w-4 inline-block ml-1" />
            </span>
          </AlertDialogWrapper>
        )}
      </div>
      <div className="flex items-center">
        {dialogFunc && (
          <Button
            variant="ghost"
            className="text-gray-300 focus:bg-zinc-800 hover:text-white hover:underline hover:bg-zinc-800"
            type="button"
            onClick={dialogFunc}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="outline"
          className="px-3 py-1 ml-2 rounded-sm bg-indigo-600 border-0 text-gray-300 hover:bg-indigo-600 hover:text-white"
          type="submit"
        >
          {text}
        </Button>
      </div>
    </div>
  );
}
