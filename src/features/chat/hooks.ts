import { useEffect, useRef, useState } from "react";
import { createOopsieConnection } from "./signalr";
import type { GroupMessage } from "./types";
import * as signalR from "@microsoft/signalr";
import { useAuthContext } from "../../app/providers/hooks/useAuthcontext";

export const useOopsieChat = (activeGroupId?: string) => {
  const { isAuthenticated } = useAuthContext();
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  // 🟩 Bağlantı kur
  useEffect(() => {
    if (!isAuthenticated) return;

    const connection = createOopsieConnection();
    connectionRef.current = connection;

    const onReceiveGroupMessage = (msg: GroupMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    const onReceiveNotification = (msg: string) => {
      console.log("Bildirim:", msg);
    };

    connection.on("ReceiveGroupMessage", onReceiveGroupMessage);
    connection.on("ReceiveNotification", onReceiveNotification);

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR connected");
      } catch (err) {
        console.error("SignalR connection failed", err);
      }
    };

    startConnection();

    return () => {
      connection.off("ReceiveGroupMessage", onReceiveGroupMessage);
      connection.off("ReceiveNotification", onReceiveNotification);
      connection.stop();
    };
  }, [isAuthenticated]);

  // 🟨 Mesaj gönder
  const sendGroupMessage = async (message: string) => {
    if (!connectionRef.current) return;

    await connectionRef.current.invoke(
      "SendToGroupMessageAsync",
      activeGroupId,
      message
    );
  };

  return {
    messages,
    sendGroupMessage,
  };
};
