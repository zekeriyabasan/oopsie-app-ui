import { Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../../components/ui/password-input";
import { signup } from "../api/auth-api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface FormValues {
  firstName?: string;
  lastName?: string;
  userName: string;
  email?: string;
  password: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      await signup({
        ...data,
        roles: ["User"], // backend isterse
      });

      navigate("/login", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const modelState = err.response.data as Record<string, string[]>;

        Object.entries(modelState).forEach(([key, messages]) => {
          setError(key as keyof FormValues, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        alert("Kayıt başarısız");
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4">
        <Field.Root>
          <Field.Label>Ad</Field.Label>
          <Input {...register("firstName")} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Soyad</Field.Label>
          <Input {...register("lastName")} />
        </Field.Root>

        <Field.Root invalid={!!errors.userName}>
          <Field.Label>Kullanıcı Adı</Field.Label>
          <Input {...register("userName", { required: "Zorunlu" })} />
          <Field.ErrorText>{errors.userName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input type="email" {...register("email")} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Şifre</Field.Label>
          <PasswordInput
            {...register("password", {
              required: "Zorunlu",
              minLength: { value: 6, message: "En az 6 karakter" },
            })}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button loading={loading} type="submit" colorScheme="blue">
          Kayıt Ol
        </Button>

        <Text fontSize="sm">
          Zaten hesabın var mı?{" "}
          <Link to="/login">
            <Text as="span" color="blue.500">
              Giriş Yap
            </Text>
          </Link>
        </Text>
      </Stack>
    </form>
  );
};

export default SignUpForm;
