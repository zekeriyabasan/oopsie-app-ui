export interface LoginRequest {
  userName: string;
  password: string;
}

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
