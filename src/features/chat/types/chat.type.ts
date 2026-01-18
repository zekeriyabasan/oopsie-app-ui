export interface ChatMessageInsertion {
  roomId: string;
  senderId: string;
  message: string;
  createdAt: string; // backend DateTime → JSON string
}

export interface ChatMessageDto {
  roomId: string;
  senderId: string;
  message: string;
  createdAt: string; // backend DateTime → JSON string
}