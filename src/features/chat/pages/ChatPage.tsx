import { Box } from "@chakra-ui/react";
import { MessageBubble } from "../components/MessageBubble";
import { MessageInput } from "../components/MessageInput";
import { useOopsieChat } from "../hooks";
import { useParams } from "react-router-dom";

interface ChatPageProps {
  userName: string;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  userName,
}) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { messages, sendGroupMessage } = useOopsieChat(groupId);

  return (
    <Box display="flex" flexDirection="column" h="100%">
      <Box flex="1" overflowY="auto" p={4}>
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            mine={m.senderUserName === userName}
            user={m.senderUserName}
            text={m.message}
          />
        ))}
      </Box>

      <MessageInput onSend={sendGroupMessage} />
    </Box>
  );
};
