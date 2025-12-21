import { Routes, Route } from "react-router-dom";
import Layout from "../shared/components/Layout";
import OopsieGroupPage from "../features/oopsie-group/pages/OopsieGroupPage";
import UserRelationPage from "../features/user-relation/pages/UserRelationPage";
import { LoginPage } from "../features/auth/pages/LoginPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/oopsie-group" element={<OopsieGroupPage />} />
        <Route path="/user-relation" element={<UserRelationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}
