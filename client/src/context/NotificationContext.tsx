"use client";
import { createContext, useContext } from "react";
import { useState, useEffect, useMemo } from "react";
import { UnreadMessage, Message } from "@/types";
import { socket } from "@/app/socket";
import { usePathname } from "next/navigation";
import { updateLastViewed } from "@/actions/conv";

interface NotificationContextProps {
  unreadMessages: UnreadMessage[];
  setUnreadMessages: (messages: UnreadMessage[]) => void;
  getCurrentUnreadMessages: (conversationId: string) => number;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export function NotificationProvider({
  children,
  initialMessages,
}: {
  children: React.ReactNode;
  initialMessages: UnreadMessage[];
}) {
  const [unreadMessages, setUnreadMessages] =
    useState<UnreadMessage[]>(initialMessages);

  const pathname = usePathname();
  let conversationId = "";
  if (pathname.includes("/home/conversations")) {
    conversationId = pathname.split("/")[3];
  }

  useEffect(() => {
    setUnreadMessages((prev: UnreadMessage[]) => {
      const conv = prev.find((message) => message.id === conversationId);

      if (conv) {
        return prev.map((message) => {
          if (message.id === conversationId) {
            return {
              ...message,
              messages: [],
            };
          }
          return message;
        });
      }

      // If the conversation is not in the list, return original list
      return prev;
    });
  }, [conversationId]);

  useEffect(() => {
    socket.on(`unread`, (data: Message) => {
      const conversation = unreadMessages.find((message) => {
        return message.id === data.conversationId;
      });
      console.log("conversation", conversation);

      if (!conversation) {
        return;
      }

      const updatedMessages = conversation.messages.concat(data);

      const newMessages = unreadMessages.map((message) => {
        if (message.id === data.conversationId) {
          return {
            ...message,
            messages: updatedMessages,
          };
        }
        return message;
      });

      setUnreadMessages(newMessages);
    });
  }, [unreadMessages]);

  const getCurrentUnreadMessages = (conversationId: string) => {
    const conversation = unreadMessages.find((message) => {
      return message.id === conversationId;
    });

    if (!conversation) {
      return 0;
    }

    return conversation.messages.length;
  };

  const value = {
    unreadMessages,
    setUnreadMessages,
    getCurrentUnreadMessages,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    // Changed from null check to undefined
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
