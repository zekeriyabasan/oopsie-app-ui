import { Avatar, AvatarGroup, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Menu } from "./components/sidebar-components/menu";


export default function Layout() {
  return (
    <Flex minH="150vh">
      {/* SOL MENU */}
      <Box w="360px" borderRight="1px solid" p="4">
        {/* Kullanıcı Profili */}
        <HStack spaceX="3" mb={30} >
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
    </Flex>
  );
}
