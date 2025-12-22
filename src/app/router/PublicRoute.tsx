import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/hooks/useAuthcontext";
import type { ReactNode } from "react";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  console.log(localStorage.getItem("access_token"))

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <>{children}</>
  );
};
