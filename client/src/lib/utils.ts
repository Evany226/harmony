import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
