import { api } from "../../../shared/api/axios";
import type { UserOopsieGroup, UserOopsieGroupDtoForInsertion } from "../types/user-oopsie-group.types";

export const getUserOopsieGroups = async (): Promise<UserOopsieGroup[]> => {
  const response = await api.get("/api/user-oopsie-groups/me");
  return response.data;
};

export const assignOopsieGroupToUser = async (request: UserOopsieGroupDtoForInsertion) => {
  const response = await api.post("/api/user-oopsie-groups", request);
  return response.data;
};
