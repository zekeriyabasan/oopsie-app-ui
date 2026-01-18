import { Box, Text } from "@chakra-ui/react";
import { getUserColor } from "../chat-color";

interface MessageBubbleProps {
  name:string|undefined;
  mine: boolean;
  user: string;
  text: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  name,
  mine,
  user,
  text,
}) => {
  return (
    <Box
      display="flex"
      justifyContent={mine ? "flex-end" : "flex-start"}
      mb={2}
    >
      <Box
        bg={mine ? "green.100" : getUserColor(user)}
        px={4}
        py={2}
        borderRadius="lg"
        maxW="60%"
      >
        {!mine && (
          <Text fontSize="xs" fontWeight="bold">
            {name ?? user}
          </Text>
        )}
        <Text>{text}</Text>
      </Box>
    </Box>
  );
};
