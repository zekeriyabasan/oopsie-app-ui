import { createContext, useState } from "react";
import { login as loginApi } from "../../features/auth/api/auth-api";
import { clearTokens, setTokens } from "../../shared/utils/token-storage";
import type { AuthContextType } from "../../features/auth/types/auth.types";



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  const login = async (username: string, password: string) => {
    const token = await loginApi({
      userName: username,
      password,
    });

    setTokens(token.accessToken, token.refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

