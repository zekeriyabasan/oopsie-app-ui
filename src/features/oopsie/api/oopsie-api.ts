import { api } from "../../../shared/api/axios";
import type { OopsieDtoForInsertion } from "../types/oopsie.types";

export const addAnOopsie = async (request: OopsieDtoForInsertion) => {
  const response = await api.post("/api/oopsies", request);
  return response.data;
};
