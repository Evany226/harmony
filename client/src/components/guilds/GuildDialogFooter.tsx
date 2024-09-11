import { Button } from "../ui/button";

export default function GuildDialogFooter({
  setDialogOpen,
}: {
  setDialogOpen: (arg: boolean) => void;
}) {
  return (
    <div className="w-full flex justify-end mt-4 space-x-2">
      <Button
        variant="ghost"
        className="text-gray-300 focus:bg-zinc-800 hover:text-white hover:underline hover:bg-zinc-800"
        type="button"
        onClick={() => setDialogOpen(false)}
      >
        Cancel
      </Button>
      <Button
        variant="outline"
        className="px-3 py-1.5 rounded-sm bg-purple-700 border-0 text-gray-300 hover:bg-purple-800 hover:text-white"
      >
        Create
      </Button>
    </div>
  );
}
