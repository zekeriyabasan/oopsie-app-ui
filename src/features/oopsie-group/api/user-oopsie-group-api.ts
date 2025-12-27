import { api } from "../../../shared/api/axios";
import type { UserOopsieGroup } from "../types/user-oopsie-group.types";

export const getUserOopsieGroups = async (): Promise<UserOopsieGroup[]> => {

 

  const response = await api.get("/api/user-oopsie-groups/me");
  return response.data;
};
