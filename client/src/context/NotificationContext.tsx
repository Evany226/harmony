"use client";

import { useState, useEffect, useContext, createContext } from "react";
import { getAllUnreadMessages } from "@/lib/conversations";
import { useAuth } from "@clerk/nextjs";

interface NotificationContextProps {
  unreadMessages: any[];
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { getToken } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const response = await getAllUnreadMessages(token as string);

      setUnreadMessages(response);
    };

    fetchData();
  }, [getToken]);

  return (
    <NotificationContext.Provider value={{ unreadMessages }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};
