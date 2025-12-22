import { Button, Field, HStack, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../../components/ui/password-input";
import { useState } from "react";
import { useAuthContext } from "../../../app/providers/hooks/useAuthcontext";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const onSubmit = handleSubmit((data) => submitLogin(data));

  const submitLogin = async (data: FormValues) => {
    try {
      setLoading(true);
      await login(data.username, data.password);
    } catch {
      alert("Kullanıcı adı veya şifre hatalı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input {...register("username")} />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <PasswordInput {...register("password")} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <HStack w="100%" justify="space-between">
          <Button
            loading={loading}
            type="submit"
            colorScheme="red"
            variant="solid"
            w="48%"
          >
            Login
          </Button>

          <Button
            onClick={() => navigate("/signup")}
            colorScheme="red"
            variant="solid"
            w="48%"
          >
            Sign Up
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};
export default LoginForm;
