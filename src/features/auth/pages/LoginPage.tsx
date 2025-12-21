import { Center, Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Center minH="100vh">
      <Box w="300px">
        <LoginForm />
      </Box>
    </Center>
  );
};
