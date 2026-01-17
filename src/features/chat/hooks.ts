import { useEffect, useRef, useState } from "react";
import { createOopsieConnection } from "./signalr";
import type { ChatMessageInsertion } from "./types/chat.type";
import { getBeforeMessagesByRoomIdAsync, getLatestMessagesByRoomIdAsync } from "./api/chat-api";
import { getUserInfo } from "../../shared/utils/token-storage";
import { useAuthContext } from "../../app/providers/hooks/useAuthcontext";
import * as signalR from "@microsoft/signalr";

export const useOopsieChat = (activeGroupId?: string) => {
  const { isAuthenticated } = useAuthContext();
  const [messages, setMessages] = useState<ChatMessageInsertion[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingOld, setLoadingOld] = useState(false);

  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const info = getUserInfo();

  // 🟢 İlk mesajları yükle
  useEffect(() => {
    if (!activeGroupId) return;

    (async () => {
      const latest = await getLatestMessagesByRoomIdAsync(activeGroupId);
      setMessages(latest.reverse()); // eski → yeni
      // eslint-disable-next-line react-hooks/immutability
      scrollToBottom();
    })();
  }, [activeGroupId]);

  // 🟢 SignalR bağlantısı
  useEffect(() => {
    if (!isAuthenticated) return;

    const connection = createOopsieConnection();
    connectionRef.current = connection;

    connection.on("ReceiveGroupMessage", (msg: ChatMessageInsertion) => {
      setMessages((prev) => [...prev, msg]);
      // eslint-disable-next-line react-hooks/immutability
      scrollIfAtBottom();
    });

    connection.start();

    return () => {
      connection.stop();
    };
  }, [isAuthenticated]);

  // 🟡 Eski mesajları yükle
  const loadOlderMessages = async () => {
    if (!activeGroupId || loadingOld || !hasMore) return;

    setLoadingOld(true);

    const first = messages[0];
    if (!first) return;

    const prevHeight = containerRef.current?.scrollHeight ?? 0;

    const older = await getBeforeMessagesByRoomIdAsync(
      activeGroupId,
      new Date(first.createdAt)
    );

    if (older.length === 0) {
      setHasMore(false);
      setLoadingOld(false);
      return;
    }

    setMessages((prev) => [...older.reverse(), ...prev]);

    // 🔥 scroll sabitle
    requestAnimationFrame(() => {
      const newHeight = containerRef.current?.scrollHeight ?? 0;
      containerRef.current!.scrollTop += newHeight - prevHeight;
    });

    setLoadingOld(false);
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

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop =
          containerRef.current.scrollHeight;
      }
    });
  };

  const scrollIfAtBottom = () => {
    const el = containerRef.current;
    if (!el) return;

    const isBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 50;

    if (isBottom) scrollToBottom();
  };

  return {
    messages,
    sendGroupMessage,
    loadOlderMessages,
    containerRef,
    loadingOld,
  };
};
