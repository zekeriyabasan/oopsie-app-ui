import { api } from "../../../shared/api/axios";
import type {
  LoginRequest,
  SignUpRequest,
  UserLoginDto,
} from "../types/auth.types";

export const login = async (data: LoginRequest): Promise<UserLoginDto> => {
  const response = await api.post("/api/authentication/login", data);
  return response.data;
};

export const signup = async (data: SignUpRequest): Promise<void> => {
  await api.post("/api/authentication", data);
};
