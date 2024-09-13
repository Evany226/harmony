import MemberCard from "@/components/guilds/MemberCard";
import { Member } from "@/types";
import { ScrollArea } from "../ui/scroll-area";

const roles = ["Owner", "Admin", "Member"];

interface UserPanelProps {
  members: Member[];
}

export default function UserPanel({ members }: UserPanelProps) {
  return (
    <ScrollArea className="w-2/12 h-full border-r border-zinc-800 flex flex-col relative px-4 space-y-4">
      {roles.map((role: string) => {
        const membersByRole = members.filter(
          (member: Member) => member.role === role.toUpperCase()
        );

        if (membersByRole.length >= 0) {
          return (
            <div className="flex flex-col w-full mb-4 " key={role}>
              <h1 className="text-gray-300 text-sm font-medium">
                {role} - {membersByRole.length}
              </h1>
              {membersByRole.map((member: Member) => (
                <div key={member.id}>
                  <MemberCard member={member.user} />
                </div>
              ))}
            </div>
          );
        }
      })}
    </ScrollArea>
  );
}
