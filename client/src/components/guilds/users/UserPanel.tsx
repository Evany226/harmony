import MemberCard from "@/components/guilds/users/MemberCard";
import { Member } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

const roles = ["Owner", "Admin", "Member"];

interface UserPanelProps {
  members: Member[];
  isPanelOpen: boolean;
}

export default function UserPanel({ members, isPanelOpen }: UserPanelProps) {
  return (
    <ScrollArea
      className={`h-full flex flex-col relative px-4 space-y-4 ${
        isPanelOpen ? "w-64" : "w-0 hidden"
      }`}
    >
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

              {membersByRole.map((member: Member) => {
                return (
                  <div key={member.id}>
                    <MemberCard member={member.user} />
                  </div>
                );
              })}
            </div>
          );
        }
      })}
    </ScrollArea>
  );
}
