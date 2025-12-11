import OopsieGroup from "./components/pages/oopsie-group";
import UserRelation from "./components/pages/user-relation";
import Layout from "./components/sidebar-components/layout";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/oopsie-group" element={<OopsieGroup />} />
        <Route path="/user-relation" element={<UserRelation />} />
      </Routes>
    </Layout>
  );
}
