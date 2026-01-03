import { Box, Text } from "@chakra-ui/react";

interface MessageBubbleProps {
  mine: boolean;
  user: string;
  text: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
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
        bg={mine ? "green.100" : "gray.200"}
        px={4}
        py={2}
        borderRadius="lg"
        maxW="60%"
      >
        {!mine && (
          <Text fontSize="xs" fontWeight="bold">
            {user}
          </Text>
        )}
        <Text>{text}</Text>
      </Box>
    </Box>
  );
};
