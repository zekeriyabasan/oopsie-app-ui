import { api } from "../../../shared/api/axios";
import type { OopsieGroupDtoForInsertion } from "../types/oopsie-group.type";


export const createAOopsieGroup = async (request: OopsieGroupDtoForInsertion) => {
  const response = await api.post("/api/oopsie-groups", request);
  return response.data;
};

