import { Blockquote, Flex } from "@chakra-ui/react";

export default function OopsieGroupPage() {
  const items = [
    {
      id: 1,
      name: "Nue Camp",
      description:
        "Modern working space with all tools. Curabitur nec odio vel dui euismod fermentum.",
      image: "https://picsum.photos/200/300?1",
    },
    {
      id: 2,
      name: "Tech Room",
      description:
        "Perfect space for hackathons. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://picsum.photos/200/300?2",
    },
    {
      id: 3,
      name: "Chill Area",
      description:
        "Relax and take a break. Curabitur nec odio vel dui euismod fermentum.",
      image: "https://picsum.photos/200/300?3",
    },
    {
      id: 4,
      name: "Meeting Lab",
      description:
        "Best place for team meetings and demos. Lorem ipsum dolor sit amet.",
      image: "https://picsum.photos/200/300?4",
    },
  ];
  return (
    <Flex gap="4" direction="column">
      {items.map((item) => (
        <Blockquote.Root>
          <Blockquote.Content>{item.description}</Blockquote.Content>
          <Blockquote.Caption>
            <cite>{item.name}</cite>
          </Blockquote.Caption>
        </Blockquote.Root>
      ))}
    </Flex>
  );
}
