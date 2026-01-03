import { Box, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { LuSend } from "react-icons/lu";

export const MessageInput = ({ onSend }: { onSend: (v: string) => void }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <Box display="flex" p={3} borderTop="1px solid" borderColor="gray.200">
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Mesaj yaz..."
        mr={2}
        onKeyDown={e => e.key === "Enter" && handleSend()}
      />

      <IconButton
        aria-label="Send"
        onClick={handleSend}
        colorScheme="green"
      >
        <LuSend/>
      </IconButton>
    </Box>
  );
};
