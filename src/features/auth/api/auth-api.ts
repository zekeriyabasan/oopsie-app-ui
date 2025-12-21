import { api } from "../../../shared/api/axios";
import type { LoginRequest, TokenDto } from "../types/auth.types";

export const login = async (data: LoginRequest): Promise<TokenDto> => {
  const response = await api.post("/api/authentication/login", data);
  return response.data;
};
