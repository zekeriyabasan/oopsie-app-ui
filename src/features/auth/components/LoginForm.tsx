import { Button, Input, Stack, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthContext } from "../../../app/providers/hooks/useAuthcontext";

export const LoginForm = () => {
  const { login } = useAuthContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await login(userName, password);
    } catch {
      alert("Kullanıcı adı veya şifre hatalı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spaceX={4}>
      <Heading size="md">Giriş Yap</Heading>

      <Input
        placeholder="Kullanıcı Adı"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        colorScheme="blue"
        loading={loading}
        onClick={handleSubmit}
      >
        Giriş Yap
      </Button>
    </Stack>
  );
};
