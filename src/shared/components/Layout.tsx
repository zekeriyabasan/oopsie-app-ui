import { Avatar, AvatarGroup, Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Menu } from "./Menu";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex minH="150vh">
      {/* SOL MENU */}
      <Box w="360px" borderRight="1px solid" p="4">
        {/* Kullanıcı Profili */}
        <HStack spaceX="3" mb={30}>
          <AvatarGroup>
            <Avatar.Root>
              <Avatar.Image src="https://i.pravatar.cc/300" alt="profile" />
              <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar.Root>
          </AvatarGroup>

          <HStack spaceX="1" flexDir="column" align="flex-start">
            <Text fontWeight="bold" fontSize="sm">
              Zekeriya Başan
            </Text>
          </HStack>
        </HStack>

        <Menu />
      </Box>

      {/* SAYFA İÇERİĞİ (ÇOK ÖNEMLİ) */}
      <Box flex="1" p="6">
        {children}
      </Box>
    </Flex>
  );
}
