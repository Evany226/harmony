import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function url() {
  return process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_API_URL
    : process.env.NEXT_PUBLIC_DEV_API_URL;
}

export function formatDateTime(timestamp: string) {
  const date = new Date(timestamp);
  const currentDate = new Date();
  const prevDate = new Date(currentDate.getDate() + 1);

  if (
    currentDate.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }) ===
    date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  ) {
    return (
      "Today at " +
      date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  if (
    currentDate.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }) ===
    date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  ) {
    return (
      "Yesterday at " +
      date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

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
