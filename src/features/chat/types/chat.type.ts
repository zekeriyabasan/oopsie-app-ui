export interface ChatMessageInsertion {
  roomId: string;
  senderId: string;
  message: string;
  createdAt: string; // backend DateTime → JSON string
}
