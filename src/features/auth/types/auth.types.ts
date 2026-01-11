export interface SignUpRequest {
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  roles?: string[];
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface UserLoginDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  tokenDto: TokenDto;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<UserLoginDto>;
  logout: () => void;
}
