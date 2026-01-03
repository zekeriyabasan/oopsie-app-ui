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

export default function Layout() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Flex w="100vw" minH="100vh">
      {/* SOL MENU */}
      <Box w="360px" borderRight="1px solid" p="4">
        {/* Kullanıcı Profili */}
        <HStack cursor={"pointer"} mb={4} w="100vw">
          <AvatarGroup>
            <Avatar.Root>
              <Avatar.Image src="https://i.pravatar.cc/300" alt="profile" />
              <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar.Root>
          </AvatarGroup>

          <Text fontWeight="bold" fontSize="sm">
            Zekeriya Başan
          </Text>

          {/* BOŞLUK → butonu sağa iter */}
          <Spacer />

          <IconButton
            as="button"
            type="button"
            aria-label="Çıkış Yap"
            size="sm"
            colorScheme="red"
            variant="solid"
            onClick={handleLogout}
          >
            <FiLogOut />
          </IconButton>
        </HStack>

        <Menu />
      </Box>

      {/* SAYFA İÇERİĞİ */}
      <Box flex="1" p="6">
        <Outlet />
      </Box>
    </Flex>
  );
}
