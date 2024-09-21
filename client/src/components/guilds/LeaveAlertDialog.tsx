import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { leaveGuild } from "@/actions";
import { useToast } from "../ui/use-toast";

interface LeaveAlertDialogProps {
  name: string;
  guildId: string;
  setDialogOpen(arg: boolean): void;
}

export default function LeaveAlertDialog({
  name,
  guildId,
  setDialogOpen,
}: LeaveAlertDialogProps) {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setDialogOpen(false);
      await leaveGuild(guildId);
      toast({
        variant: "default",
        title: `Left guild successfully.`,
        description: `You have left the guild: ${name}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to leave guild",
        description:
          error.message ||
          "An error occurred while leaving the guild. Please try again later.",
      });
    }
  };

  return (
    <DialogContent className="bg-zinc-800">
      <DialogHeader>
        <DialogTitle className="text-gray-300 text-lg px-0 ">
          Leave {name}
        </DialogTitle>
        <DialogDescription className="text-gray-300 text-sm ">
          Are you sure you want to leave{" "}
          <span className="font-bold">{name}</span>? You will be unable to
          re-join without an invite.
        </DialogDescription>
      </DialogHeader>

      <form
        className="flex mt-4 space-x-2 justify-end items-center"
        onSubmit={handleSubmit}
      >
        <Button
          variant="ghost"
          className="text-gray-300 focus:bg-zinc-800 hover:text-white hover:underline hover:bg-zinc-800"
          type="button"
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="outline"
          className="px-3 py-1 ml-2 rounded-sm bg-red-600 border-0 text-gray-300 hover:bg-red-700"
        >
          <p className="text-gray-300 font-medium group-hover:text-white">
            Leave
          </p>
        </Button>
      </form>
    </DialogContent>
  );
}
