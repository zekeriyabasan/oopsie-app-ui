import { api } from "../../../shared/api/axios";

export const getLatestMessagesByRoomIdAsync = async (roomId: string) => {
  const response = await api.get(`/api/chats/${roomId}`);
  return response.data;
};
export const getBeforeMessagesByRoomIdAsync = async (roomId: string, before:Date) => {
  const response = await api.get(`/api/chats/${roomId}/${before}`);
  return response.data;
};
