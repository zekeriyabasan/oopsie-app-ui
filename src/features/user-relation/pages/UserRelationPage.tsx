import { Flex, HStack, IconButton, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserRelations } from "../api/user-relation-api";
import { LuPlus } from "react-icons/lu";
import { UserRelationCard } from "../components/UserRelationCard";
import type { UserRelation } from "../types/user-relation.types";

export default function UserRelationPage() {
  const [loading, setLoading] = useState(true);
  const [relations, setRelations] = useState<UserRelation[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getUserRelations();
        setRelations(data);
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
  const handleAdd = () => {
    console.log("Yeni ilişki ekle");
  };

  const handleEdit = (relation: UserRelation) => {
    console.log("Edit:", relation);
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  return (
    <Flex direction="column" p="6" gap="6">
      <HStack spaceX="3" align="center">
        <Input placeholder="User ID giriniz" maxW="260px" size="md" />

        <IconButton
          aria-label="Kullanıcı ekle"
          colorScheme="green"
          onClick={handleAdd}
        >
          <LuPlus />
        </IconButton>
      </HStack>

      <VStack spaceX="4" align="stretch">
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
