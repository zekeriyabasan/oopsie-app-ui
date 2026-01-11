import {
  Blockquote,
  Box,
  Button,
  CloseButton,
  Collapsible,
  Dialog,
  Flex,
  HStack,
  IconButton,
  Input,
  Portal,
  Spacer,
  Table,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  assignOopsieGroupToUser,
  getUserOopsieGroups,
} from "../api/user-oopsie-group-api";
import type { UserOopsieGroup } from "../types/user-oopsie-group.types";
import {
  LuChevronRight,
  LuCircleCheckBig,
  LuMessagesSquare,
  LuPencil,
  LuPlus,
  LuTrash2,
  LuUserPlus,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { addAnOopsie } from "../../oopsie/api/oopsie-api";

export default function OopsieGroupPage() {
  const [userId, setUserId] = useState("");
  const [oopsieText, setOopsieText] = useState("");
  const [groups, setGroups] = useState<UserOopsieGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  const addOopsie = async (groupId: string) => {
    try {
      setLoading(true);

      await addAnOopsie({
        text: oopsieText,
        parentGroupId: groupId,
      });

      setOopsieText("");
      // dialog otomatik kapanır (ActionTrigger sayesinde)
    } catch (error) {
      console.error("create error", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAssignUser = async (groupId: string) => {
    if (!userId) return;

    try {
      setLoading(true);

      await assignOopsieGroupToUser({
        userId,
        groupId,
      });

      setUserId("");
      // dialog otomatik kapanır (ActionTrigger sayesinde)
    } catch (error) {
      console.error("User assign error", error);
    } finally {
      setLoading(false);
    }
  };
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

                <Spacer />

                {/* Butonlar – en sağda */}
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <IconButton
                      aria-label="Edit"
                      size="sm"
                      variant="ghost"
                      colorPalette="fg"
                    >
                      <LuPlus />
                    </IconButton>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>Oopsie Ekle</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <Textarea placeholder="Oopsie Text..."
                            value={oopsieText}
                            onChange={(e) => setOopsieText(e.target.value)}
                            required
                          />
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </Dialog.ActionTrigger>
                          <Button
                            type="submit"
                            onClick={() => {
                              addOopsie(group.groupId);
                            }}
                          >
                            Save
                          </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <IconButton
                      aria-label="Assign User"
                      size="sm"
                      variant="ghost"
                      colorPalette="fg"
                    >
                      <LuUserPlus />
                    </IconButton>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>Gruba Kullanıcı Ekle</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <p>
                            Grup sohbetleri ve kullanıcının grubu görebilmesi
                            için kullanıcı id ile ekleme yapabilirsiniz.
                          </p>
                          <Input
                            placeholder="Kullanıcı ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                          />
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </Dialog.ActionTrigger>
                          <Button
                            type="submit"
                            onClick={() => {
                              handleAssignUser(group.groupId);
                            }}
                          >
                            Save
                          </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>

                <IconButton
                  aria-label="Edit"
                  size="sm"
                  variant="ghost"
                  colorPalette="fg"
                  onClick={() => navigate(`/chat/${group.groupId}`)}
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
                                variant="ghost"
                                colorPalette="red"
                              >
                                <LuTrash2 />
                              </IconButton>

                              <IconButton
                                aria-label="Share"
                                size="sm"
                                variant="ghost"
                                colorPalette="blue"
                              >
                                <LuPencil />
                              </IconButton>
                              <IconButton
                                aria-label="Tamamla"
                                size="sm"
                                variant="ghost"
                                colorPalette="green"
                              >
                                <LuCircleCheckBig />
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
