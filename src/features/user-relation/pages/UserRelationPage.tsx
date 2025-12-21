import { Avatar, Flex, HStack, Stack, Text } from "@chakra-ui/react";

export default function UserRelation() {
  const items = [
    {
      id: 1,
      name: "Nue Camp",
      image: "https://picsum.photos/200/300?1",
    },
    {
      id: 2,
      name: "Tech Room",
      image: "https://picsum.photos/200/300?2",
    },
    {
      id: 3,
      name: "Chill Area",
      image: "https://picsum.photos/200/300?3",
    },
    {
      id: 4,
      name: "Meeting Lab",
      image: "https://picsum.photos/200/300?4",
    },
  ];
  return (
    <Flex gap="4" direction="column">
      {items.map((item) => (
        <HStack key={item.id} gap="4">
          <Avatar.Root>
            <Avatar.Fallback name={item.name} />
            <Avatar.Image src={item.image} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium">{item.name}</Text>
            <Text color="fg.muted" textStyle="sm">
              {item.name}
            </Text>
          </Stack>
        </HStack>
      ))}
    </Flex>
  );
}
