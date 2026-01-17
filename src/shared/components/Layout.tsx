import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  HStack,
  Text,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";
import { useAuthContext } from "../../app/providers/hooks/useAuthcontext";
import { FiLogOut } from "react-icons/fi";
import { getUserInfo } from "../utils/token-storage";
import { Clipboard } from "@chakra-ui/react"
export default function Layout() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const info = getUserInfo();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Flex minH="100vh" w="100%">
      
      {/* SIDEBAR */}
      <Box
        w="360px"
        borderRight="1px solid"
        p="4"
        flexShrink={0} // ❗ Sidebar ASLA daralmaz
      >
        <HStack mb={4}>
          <AvatarGroup>
            <Avatar.Root>
              <Avatar.Image src="https://i.pravatar.cc/300" />
              <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar.Root>
          </AvatarGroup>

          <Text fontWeight="bold" fontSize="sm">
            {info.FirstName} {info.LastName}
          </Text>
          <Clipboard.Root value={info?.UserId || ""}>
            <Clipboard.Trigger asChild>
              <IconButton variant="surface" size="xs">
                <Clipboard.Indicator />
                {info.UserId}
              </IconButton>
            </Clipboard.Trigger>
          </Clipboard.Root>
          <Spacer />

          <IconButton
            aria-label="Çıkış Yap"
            size="sm"
            colorScheme="red"
            onClick={handleLogout}
          >
            <FiLogOut />
          </IconButton>
          
        </HStack>

        <Menu />
        
      </Box>

      {/* CONTENT */}
      <Box
        flex="1"
        minW={0} // 🔥 ALTIN KURAL
        p="6"
        overflow="auto"
      >
        <Outlet />
      </Box>
      
    </Flex>
  );
}
