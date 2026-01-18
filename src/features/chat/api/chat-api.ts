import { api } from "../../../shared/api/axios";
import type { ChatMessageDto } from "../types/chat.type";

export const getLatestMessagesByRoomIdAsync = async (roomId: string):Promise<ChatMessageDto[]> => {
  const response = await api.get(`/api/chats/${roomId}`);
  return response.data;
};
export const getBeforeMessagesByRoomIdAsync = async (roomId: string, before:string) => {
  const response = await api.get(`/api/chats/${roomId}/${before}`);
  return response.data;
};
