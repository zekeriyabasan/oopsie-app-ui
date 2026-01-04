import {
  Button,
  Field,
  Fieldset,
  Flex,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addAnUserRelation, getUserRelations } from "../api/user-relation-api";
import { UserRelationCard } from "../components/UserRelationCard";
import type { UserRelation } from "../types/user-relation.types";

export default function UserRelationPage() {
  const [loading, setLoading] = useState(true);
  const [relations, setRelations] = useState<UserRelation[]>([]);

  const fetchUserRelations = async () => {
    try {
      const data = await getUserRelations();
      setRelations(data);
    } catch (error) {
      console.error("alınamadı", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserRelations();
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }
  const handleAdd = async (e?: React.FormEvent<HTMLFormElement>) => {
    const form = e?.currentTarget;
    const formData = new FormData(form);

    const relatedUserId = formData.get("userId") as string;
    const relationName = formData.get("relationName") as string;

    await addAnUserRelation({
      relatedUserId: relatedUserId,
      relationName: relationName,
    });
    await fetchUserRelations();
  };

  const handleEdit = (relation: UserRelation) => {
    console.log("Edit:", relation);
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  return (
    <Flex direction="column" p="6" gap="6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd(e);
        }}
      >
        <HStack>
          <Fieldset.Root size="lg" maxW="100%">
            <Fieldset.Content>
              <HStack spaceX="4" align="flex-end">
                <Field.Root required flex="1">
                  <Field.Label>
                    Kullanıcı ID <Field.RequiredIndicator />
                  </Field.Label>
                  <Input name="userId" />
                </Field.Root>

                <Field.Root required flex="1">
                  <Field.Label>Kullanıcı İsmi</Field.Label>
                  <Input name="relationName" />
                </Field.Root>

                <Button type="submit" colorScheme="green">
                  EKLE
                </Button>
              </HStack>
            </Fieldset.Content>
          </Fieldset.Root>
        </HStack>
      </form>

      <VStack align="stretch">
        {relations.map((item) => (
          <UserRelationCard
            key={item.id}
            relation={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </VStack>
    </Flex>
  );
}
