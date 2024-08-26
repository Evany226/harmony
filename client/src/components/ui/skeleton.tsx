import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      //   className={cn("animate-pulse rounded-md bg-slate-100 dark:bg-slate-800", className)}

      className={cn("animate-pulse rounded-md bg-zinc-700", className)}
      {...props}
    />
  );
}

export { Skeleton };
