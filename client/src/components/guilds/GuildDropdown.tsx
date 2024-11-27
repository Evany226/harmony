"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog } from "@/components/ui/dialog";

import {
  UserPlusIcon,
  ArrowRightStartOnRectangleIcon,
  FolderPlusIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";

import LeaveAlertDialog from "./LeaveAlertDialog";
import GuildSettingsDialog from "./GuildSettingsDialog";
import InviteDialog from "./InviteDialog";
import { Guild, Member } from "@/types";

import { useState } from "react";

interface GuildSettingsProps {
  children: React.ReactNode;
  guild: Guild;
  currentMember: Member;
}

export default function GuildDropdown({
  children,
  guild,
  currentMember,
}: GuildSettingsProps) {
  const [settingsDialogOpen, setSettingsDialogOpen] = useState<boolean>(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState<boolean>(false);
  const [leaveServerAlert, setLeaveServerAlert] = useState<boolean>(false);

  return (
    <Dialog
      open={settingsDialogOpen || inviteDialogOpen || leaveServerAlert}
      onOpenChange={
        settingsDialogOpen
          ? setSettingsDialogOpen
          : inviteDialogOpen
          ? setInviteDialogOpen
          : setLeaveServerAlert
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-800 w-56 px-2 py-2">
          <DropdownMenuItem
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setSettingsDialogOpen(true)}
          >
            <p className="text-gray-300">Server Settings</p>
            <Cog8ToothIcon className="w-5 h-5 text-gray-300" />
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-600" />
          <DropdownMenuItem
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setInviteDialogOpen(true)}
          >
            <p className="text-indigo-500">Invite People</p>
            <UserPlusIcon className="w-5 h-5 text-indigo-500" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
            <p className="text-gray-300">Add Category</p>
            <FolderPlusIcon className="w-5 h-5 text-gray-300" />
          </DropdownMenuItem>
          {currentMember.role !== "OWNER" && (
            <>
              <DropdownMenuSeparator className="bg-zinc-600" />
              <DropdownMenuItem onClick={() => setLeaveServerAlert(true)}>
                <div className="w-full flex items-center justify-between cursor-pointer">
                  <p className="text-red-500">Leave Server</p>
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-red-500" />
                </div>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {settingsDialogOpen && (
        <GuildSettingsDialog
          setDialogOpen={setSettingsDialogOpen}
          guild={guild}
          currentMember={currentMember}
        />
      )}

      {inviteDialogOpen && (
        <InviteDialog guildId={guild.id} setDialogOpen={setInviteDialogOpen} />
      )}

      {leaveServerAlert && (
        <LeaveAlertDialog
          name={guild.name}
          guildId={guild.id}
          setDialogOpen={setLeaveServerAlert}
        />
      )}
    </Dialog>
  );
}
