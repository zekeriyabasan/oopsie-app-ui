import {
  Blockquote,
  Box,
  Button,
  Collapsible,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Table,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserOopsieGroups } from "../api/user-oopsie-group-api";
import type { UserOopsieGroup } from "../types/user-oopsie-group.types";
import {
  LuChevronRight,
  LuCircleArrowOutDownLeft,
  LuCopy,
  LuDelete,
  LuMessageCircle,
  LuMessageCircleDashed,
  LuMessageCircleMore,
  LuMessageCirclePlus,
  LuMessageCircleReply,
  LuMessageSquareHeart,
  LuMessagesSquare,
  LuPencil,
  LuPlus,
  LuTrash2,
  LuUserPlus,
} from "react-icons/lu";

export default function OopsieGroupPage() {
  const [groups, setGroups] = useState<UserOopsieGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getUserOopsieGroups();
        setGroups(data);
      } catch (error) {
        console.error("Oopsie grupları alınamadı", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Flex direction="column" gap="4" w="100%">
      {groups.map((group) => (
        <Blockquote.Root key={group.id} w="100%">
          <Blockquote.Content w="100%">
            <Collapsible.Root defaultOpen>
              <Collapsible.Trigger
                w="100%"
                display="flex"
                alignItems="center"
                gap="2"
                py="2"
              >
                <Collapsible.Indicator
                  transition="transform 0.2s"
                  _open={{ transform: "rotate(90deg)" }}
                >
                  <LuChevronRight />
                </Collapsible.Indicator>

                {/* Grup adı – en solda */}
                <Box fontWeight="medium">{group.group.name}</Box>

                {/* 🔥 BU HER ŞEYİ ÇÖZER */}
                <Spacer />

                {/* Butonlar – en sağda */}
                

<IconButton
                  aria-label="Edit"
                  size="sm"
                  variant="ghost"
                  colorPalette="fg"
                >
                  <LuPlus />
                </IconButton>
                <IconButton
                  aria-label="Edit"
                  size="sm"
                  variant="ghost"
                  colorPalette="fg"
                >
                  <LuUserPlus />
                </IconButton>
                <IconButton
                  aria-label="Edit"
                  size="sm"
                  variant="ghost"
                  colorPalette="fg"
                >
                  <LuMessagesSquare />
                </IconButton>
              </Collapsible.Trigger>

              <Collapsible.Content w="100%">
                <Box w="100%" minW={0} overflowX="auto">
                  <Table.Root
                    size="sm"
                    w="100%"
                    tableLayout="fixed"
                    variant="outline"
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Text</Table.ColumnHeader>
                        <Table.ColumnHeader w="120px">
                          IsCompleted
                        </Table.ColumnHeader>
                        <Table.ColumnHeader w="140px">
                          Actions
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {group.group.oopsies.map((o) => (
                        <Table.Row key={o.id}>
                          <Table.Cell>{o.text}</Table.Cell>
                          <Table.Cell>
                            {o.isCompleted ? "Yes" : "No"}
                          </Table.Cell>
                          <Table.Cell>
                            <HStack justify="flex-start">
                              <IconButton
                                aria-label="Delete"
                                size="sm"
                                variant="surface"
                                colorPalette="red"
                              >
                                <LuTrash2 />
                              </IconButton>

                              <IconButton
                                aria-label="Share"
                                size="sm"
                                variant="ghost"
                                colorPalette="green"
                              >
                                <LuPencil />
                              </IconButton>
                              <IconButton
                                aria-label="Copy ID"
                                size="sm"
                                variant="surface"
                                colorPalette="orange"
                                onClick={() =>
                                  navigator.clipboard.writeText(o.id)
                                }
                              >
                                <LuCopy />
                              </IconButton>
                            </HStack>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>
          </Blockquote.Content>
        </Blockquote.Root>
      ))}
    </Flex>
  );
}
