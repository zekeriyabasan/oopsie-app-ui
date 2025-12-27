import { Blockquote, Collapsible, Flex, Stack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserOopsieGroups } from "../api/user-oopsie-group-api";
import type { UserOopsieGroup } from "../types/user-oopsie-group.types";
import { LuChevronRight } from "react-icons/lu";

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
    <Flex gap="4" direction="column">
      {groups.map((item) => (
        <Blockquote.Root key={item.id}>
          <Blockquote.Content>
            <Collapsible.Root defaultOpen>
              <Collapsible.Trigger
                paddingY="3"
                display="flex"
                gap="2"
                alignItems="center"
              >
                <Collapsible.Indicator
                  transition="transform 0.2s"
                  _open={{ transform: "rotate(90deg)" }}
                >
                  <LuChevronRight />
                </Collapsible.Indicator>
                {item.group.name}
              </Collapsible.Trigger>
              <Collapsible.Content>
                <Stack padding="4">
                  <Table.Root size="sm" interactive>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Text</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">
                          IsCompleted
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {item.group.oopsies.map((item) => (
                        <Table.Row color={"colorPalette.800"} key={item.id}>
                          <Table.Cell>{item.id}</Table.Cell>
                          <Table.Cell>{item.text}</Table.Cell>
                          <Table.Cell textAlign="end">
                            {item.isCompleted}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Stack>
              </Collapsible.Content>
            </Collapsible.Root>
          </Blockquote.Content>
          <Blockquote.Caption>
            <cite>{item.group.description}</cite>
          </Blockquote.Caption>
        </Blockquote.Root>
      ))}
    </Flex>
  );
}
