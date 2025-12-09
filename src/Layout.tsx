import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Menu } from "./components/sidebar-components/menu";

export default function Layout() {
  return (
    <Flex minH="150vh">
      {/* SOL MENU */}
      <Box w="360px" borderRight="1px solid" p="4">
        {/* Kullanıcı Profili */}
        <VStack mb="8">
        
        
          <Text fontSize="lg" color={"black"} fontWeight="bold">
            Zekeriya
          </Text>
          <Text fontSize="sm" color="gray.500">
            Developer
          </Text>
        </VStack>

        {/* MENÜ */}

        <Menu />
      </Box>
    </Flex>
  );
}
