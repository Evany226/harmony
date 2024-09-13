import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipWrapper({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="p-0 m-0">{children}</TooltipTrigger>
        <TooltipContent className="bg-neutral-900">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
