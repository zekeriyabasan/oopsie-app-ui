import {
  HStack,
  Stack,
  Text,
  IconButton,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import type { UserRelation } from "../types/user-relation.types";


interface Props {
  relation: UserRelation;
  onEdit: (relation:UserRelation) => void;
  onDelete: (id: string) => void;
}

export const UserRelationCard = ({ relation, onEdit, onDelete }: Props) => {
  return (
    <Box
      w="100%"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      _hover={{ bg: "gray.50" }}
    >
      <HStack justify="space-between">
        <HStack gap="4">
          <Avatar.Root>
            <Avatar.Fallback name={relation.relationName} />
            <Avatar.Image
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${relation.id}`}
            />
          </Avatar.Root>

          <Stack gap="0">
            <Text fontWeight="semibold">
              {relation.relationName}
            </Text>
            <Text fontSize="sm" color="fg.muted">
              {relation.relatedUserId}
            </Text>
          </Stack>
        </HStack>

        <HStack>
          <IconButton
            aria-label="Edit"
            size="sm"
            variant="ghost"
            onClick={() => onEdit(relation)}
          >
            <LuPencil />
          </IconButton>

          <IconButton
            aria-label="Delete"
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(relation.id)}
          >
            <LuTrash2 />
          </IconButton>
        </HStack>
      </HStack>
    </Box>
  );
};
