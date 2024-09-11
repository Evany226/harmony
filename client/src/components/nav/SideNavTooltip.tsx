import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SideNavTooltipProps {
  text: string;
  children: React.ReactNode;
}

export default function SideNavTooltip({
  text,
  children,
}: SideNavTooltipProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="bg-neutral-900" side={"right"}>
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
