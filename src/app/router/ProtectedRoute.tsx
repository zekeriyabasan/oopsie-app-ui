import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/hooks/useAuthcontext";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
