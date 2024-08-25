import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Dropdown({
  children,
  removeFriend,
}: {
  children: React.ReactNode;
  removeFriend: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" alignOffset={12}>
        <DropdownMenuItem
          onClick={removeFriend}
          className="text-red-500 cursor-pointer"
        >
          Remove Friend
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
