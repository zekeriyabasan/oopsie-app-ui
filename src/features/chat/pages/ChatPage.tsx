import { useParams } from "react-router-dom";
import { useOopsieChat } from "../hooks";
import { Box, Button } from "@chakra-ui/react";
import { MessageBubble } from "../components/MessageBubble";
import { MessageInput } from "../components/MessageInput";
import { getUserInfo } from "../../../shared/utils/token-storage";
import { useEffect, useState } from "react";
import { getUserRelations } from "../../user-relation/api/user-relation-api";
import type { UserRelation } from "../../user-relation/types/user-relation.types";

export const ChatPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
    const [relations, setRelations] = useState<UserRelation[]>([]);
  const info = getUserInfo();

  const {
    messages,
    sendGroupMessage,
    loadOlderMessages,
  } = useOopsieChat(groupId);
  
  const fetchUserRelations = async () => {
    try {
      const data = await getUserRelations();
      setRelations(data);
    } catch (error) {
      console.error("alınamadı", error);
    } 
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserRelations();
    };

    fetchData();
  }, []);
  return (
    <Box display="flex" flexDirection="column" h="100%">
      <Box
        flex="1"
        overflowY="auto"
        p={4}
      >
         {/* 👆 EN ÜST BUTON */}
        <Box textAlign="center" mb={3}>
          <Button
            size="sm"
            onClick={loadOlderMessages}
            loadingText="Yükleniyor"
          >
            Eski mesajları yükle
          </Button>
        </Box>

        {messages.map((m) => (
          <MessageBubble
            key={m.createdAt + m.senderId}
            mine={m.senderId === info.UserId}
            user={m.senderId}
            text={m.message}
            name ={relations.find((r)=>r.relatedUserId == m.senderId)?.relationName}
          />
        ))}
      </Box>

      <MessageInput onSend={sendGroupMessage} />
    </Box>
  );
};
