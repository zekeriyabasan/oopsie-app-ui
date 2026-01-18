import { useEffect, useRef, useState } from "react";
import { createOopsieConnection } from "./signalr";
import type { ChatMessageDto, ChatMessageInsertion } from "./types/chat.type";
import {
  getBeforeMessagesByRoomIdAsync,
  getLatestMessagesByRoomIdAsync,
} from "./api/chat-api";
import { getUserInfo } from "../../shared/utils/token-storage";
import { useAuthContext } from "../../app/providers/hooks/useAuthcontext";
import * as signalR from "@microsoft/signalr";
import dayjs from "dayjs";

export const useOopsieChat = (activeGroupId?: string) => {
  const { isAuthenticated } = useAuthContext();
  const [messages, setMessages] = useState<ChatMessageDto[]>([]);

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const info = getUserInfo();

  useEffect(() => {
  if (!activeGroupId) return;

  let cancelled = false;

  (async () => {
    const latest = await getLatestMessagesByRoomIdAsync(activeGroupId);
    if (!cancelled) {
      setMessages(latest);
    }
  })();

  return () => {
    cancelled = true;
  };
}, [activeGroupId]);


  // 🟢 SignalR bağlantısı
  useEffect(() => {
    if (!isAuthenticated) return;

    const connection = createOopsieConnection();
    connectionRef.current = connection;

    connection.on("ReceiveGroupMessage", (msg: ChatMessageInsertion) => {
      setMessages((prev) => [...prev, msg]);
    });

    connection.start();

    return () => {
      connection.stop();
    };
  }, [isAuthenticated]);

  // 🟡 Eski mesajları yükle
  const loadOlderMessages = async () => {
    const first = messages[0];
    if (!first) return;

    const formatted = dayjs(first.createdAt).format("YYYY-MM-DD HH:mm:ss");
    const older = await getBeforeMessagesByRoomIdAsync(
      activeGroupId ?? "",
      formatted,
    );

    setMessages((prev) => [...older.reverse(), ...prev]);
  };

  const sendGroupMessage = async (messageText: string) => {
    if (!connectionRef.current || !activeGroupId) return;

    const message: ChatMessageInsertion = {
      roomId: activeGroupId,
      senderId: info.UserId?.toString() ?? "",
      message: messageText,
      createdAt: new Date().toISOString(),
    };

    await connectionRef.current.invoke("SendToGroupMessageAsync", message);
  };

  return {
    messages,
    sendGroupMessage,
    loadOlderMessages,
  };
};
