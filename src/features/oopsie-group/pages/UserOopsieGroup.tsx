import {
  Blockquote,
  Box,
  Collapsible,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Table,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
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
  LuTrash2,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { addAnOopsie } from "../../oopsie/api/oopsie-api";
import AddOopsieDialog from "../components/dialogs/AddOopsieDialog";
import AssignUserDialog from "../components/dialogs/AssignUserDialog";
import AddOopsieGroupDialog from "../components/dialogs/AddOopsieGroupDialog";
import { createAOopsieGroup } from "../api/oopsie-group-api";

export default function UserOopsieGroupPage() {
  const [userId, setUserId] = useState("");
  const [oopsieText, setOopsieText] = useState("");

  const [oopsieGroupText, setOopsieGroupText] = useState("");
  const [oopsieGroupDescriptionText, setOopsieGroupDescriptionText] = useState("");

  const [groups, setGroups] = useState<UserOopsieGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUserOopsieGroups();
      setGroups(data);
    } catch (error) {
      console.error("Oopsie grupları alınamadı", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }
  const addOopsieGroup = async () => {
    try {
      setLoading(true);

      await createAOopsieGroup({
        name: oopsieGroupText,
        description: oopsieGroupDescriptionText,
      });

      setOopsieGroupText("");
      setOopsieGroupDescriptionText("");
      // dialog otomatik kapanır (ActionTrigger sayesinde)
      await fetchGroups();
    } catch (error) {
      console.error("create error", error);
    } finally {
      setLoading(false);
    }
  };
  const addOopsie = async (groupId: string) => {
    try {
      setLoading(true);

      await addAnOopsie({
        text: oopsieText,
        parentGroupId: groupId,
      });

      setOopsieText("");
      // dialog otomatik kapanır (ActionTrigger sayesinde)

      await fetchGroups();
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
      <Box>
        <Box fontSize="xl" fontWeight="bold">
          Kullanıcı Oopsie Grupları
        </Box>
        <Box fontSize="sm" color="gray.500">
          Oopsie gruplarını yönetin
        </Box>
      </Box>

      <AddOopsieGroupDialog
        oopsieGroupText={oopsieGroupText}
        oopsieGroupDescriptionText={oopsieGroupDescriptionText}
        setOopsieGroupText={setOopsieGroupText}
        setOopsieGroupDescriptionText={setOopsieGroupDescriptionText}
        addOopsieGroup={addOopsieGroup}
      />
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

                <AddOopsieDialog
                  groupId={group.groupId}
                  oopsieText={oopsieText}
                  setOopsieText={setOopsieText}
                  addOopsie={() => {
                    addOopsie(group.groupId);
                  }}
                />

                <AssignUserDialog
                  groupId={group.groupId}
                  onSave={(groupId) => handleAssignUser(groupId)}
                />

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
