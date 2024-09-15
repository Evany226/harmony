import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function InviteDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-gray-300">INVITE</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
