import { useEffect, useRef, useState } from "react";
import { createOopsieConnection } from "./signalr";
import * as signalR from "@microsoft/signalr";
import { useAuthContext } from "../../app/providers/hooks/useAuthcontext";

export const useOopsieChat = (activeGroupId?: string) => {
  const { isAuthenticated } = useAuthContext();
  const [messages, setMessages] = useState<string[]>([]);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  // 🟩 Bağlantı kur
  useEffect(() => {
    if (!isAuthenticated) return;

    const connection = createOopsieConnection();
    connectionRef.current = connection;

    connection.on("ReceiveGroupMessage", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    connection.on("ReceiveNotification", (msg: string) => {
      console.log("Bildirim:", msg);
    });

    connection.start().catch(console.error);

    return () => {
      connection.stop();
    };
  }, [isAuthenticated]);

  // 🟨 Mesaj gönder
  const sendGroupMessage = async (message: string) => {
    if (!connectionRef.current) return;
    if (!activeGroupId) {
      console.warn("activeGroupId yok, mesaj gönderilmedi");
      return;
    }

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
