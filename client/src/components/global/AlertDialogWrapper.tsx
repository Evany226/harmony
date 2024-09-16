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

export default function AlertDialogWrapper({
  children,
  handleDelete,
  variant,
}: {
  children: React.ReactNode;
  handleDelete: () => void;
  variant: "Category" | "Channel" | "Guild";
}) {
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
                This action cannot be undone. This will permanently delete your
                channel and remove any corresponding messages.
              </p>
            ) : (
              <p>
                This action cannot be undone. This will permanently delete your
                category and ALL the channels associated with it.
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
