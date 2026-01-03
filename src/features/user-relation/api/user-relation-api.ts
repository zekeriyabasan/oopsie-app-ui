import { api } from "../../../shared/api/axios";
import type {
  UserRelation,
  UserRelationDtoForInsertion,
} from "../types/user-relation.types";

export const getUserRelations = async (): Promise<UserRelation[]> => {
  const response = await api.get("/api/user-relations");
  return response.data;
};

export const addAnUserRelation = async (
  request: UserRelationDtoForInsertion
) => {
  const response = await api.post("/api/user-relations", request);
  return response.data;
};
