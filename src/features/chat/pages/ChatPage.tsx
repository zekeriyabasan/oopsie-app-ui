import { useParams } from "react-router-dom";
import { useOopsieChat } from "../hooks";
import { Box } from "@chakra-ui/react";
import { MessageBubble } from "../components/MessageBubble";
import { MessageInput } from "../components/MessageInput";

export const ChatPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const {
    messages,
    sendGroupMessage,
    loadOlderMessages,
    containerRef,
    loadingOld,
  } = useOopsieChat(groupId);

  const onScroll = () => {
    if (!containerRef.current) return;

    if (containerRef.current.scrollTop === 0) {
      loadOlderMessages();
    }
  };

  return (
    <Box display="flex" flexDirection="column" h="100%">
      <Box
        ref={containerRef}
        flex="1"
        overflowY="auto"
        p={4}
        onScroll={onScroll}
      >
        {loadingOld && <Box textAlign="center">Yükleniyor...</Box>}

        {messages.map((m) => (
          <MessageBubble
            key={m.createdAt + m.senderId}
            mine={false}
            user={m.senderId}
            text={m.message}
          />
        ))}
      </Box>

      <MessageInput onSend={sendGroupMessage} />
    </Box>
  );
};
