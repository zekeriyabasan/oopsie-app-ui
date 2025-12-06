import { Box, Flex,  Text, VStack, Link, AvatarIcon } from "@chakra-ui/react";

export default function Layout() {
  return (
    <Flex minH="150vh" bg="gray.50">
      {/* SOL MENU */}
      <Box
        w="360px"
        bg="white"
        borderRight="1px solid"
        borderColor="gray.200"
        p="4"
      >
        {/* Kullanıcı Profili */}
        <VStack mb="8">
          <AvatarIcon  />
          <Text fontSize="lg" color={"black"} fontWeight="bold">
            Zekeriya
          </Text>
          <Text fontSize="sm" color="gray.500">
            Developer
          </Text>
        </VStack>

        {/* MENÜ */}
        <VStack align="start" >
          <Link fontWeight="medium" _hover={{ color: "blue.500" }}>
            Dashboard
          </Link>
          <Link fontWeight="medium" _hover={{ color: "blue.500" }}>
            Profilim
          </Link>
          <Link fontWeight="medium" _hover={{ color: "blue.500" }}>
            Ayarlar
          </Link>
          <Link fontWeight="medium" _hover={{ color: "blue.500" }}>
            Çıkış Yap
          </Link>
        </VStack>
      </Box>
     
    </Flex>
  );
}
