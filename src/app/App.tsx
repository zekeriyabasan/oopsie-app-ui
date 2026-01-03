import { Routes, Route } from "react-router-dom";
import Layout from "../shared/components/Layout";
import OopsieGroupPage from "../features/oopsie-group/pages/OopsieGroupPage";
import UserRelationPage from "../features/user-relation/pages/UserRelationPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { PublicRoute } from "./router/PublicRoute";
import SignUpPage from "../features/auth/pages/SignUpPage";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />

      {/* PROTECTED */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="oopsie-group" element={<OopsieGroupPage />} />
        <Route path="user-relation" element={<UserRelationPage />} />
      </Route>
    </Routes>
  );
}
