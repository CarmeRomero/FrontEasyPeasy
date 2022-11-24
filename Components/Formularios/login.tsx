import Link from "next/link";
import {
  TextInput,
  Group,
  Button,
  Card,
  PasswordInput,
  Text,
  Title,
  Divider,
  LoadingOverlay,
  Alert,
  Box,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useMutateIngresar,
  useMutateLogout,
} from "../../hooks/useAutorizacion";
import { IUsuarioCredenciales } from "../../interfaces/usuario-credenciales";
import { useRouter } from "next/router";

export const FormularioIngreso = () => {
  const router = useRouter();

  const form = useForm<IUsuarioCredenciales>({
    initialValues: {
      email: "carme_romero91@hotmail.com",
      password: "asdasd",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) =>
        value.length < 6
          ? "La contraseña debe contener al menos 6 caracteres"
          : null,
    },
  });

  const { mutate, isLoading } = useMutateIngresar();
  const { mutate: algo } = useMutateLogout();

  const handleSubmit = (values: IUsuarioCredenciales) =>
    mutate(values, {
      onSuccess: () => {
        form.reset();
        router.replace("/usuarios");
      },
    });

  return (
    <Stack spacing="xs">
      <Card
        sx={{
          width: 360,
          boxShadow:
            "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
          opacity: 0.8,
          color: "rgb(235, 232, 242)",
          backgroundColor: "rgba(0,0,0,.4)",
        }}
        mx="auto"
        p="lg"
      >
        <>
          <LoadingOverlay visible={isLoading} />
          <Group position="center" mb="md">
            <Title order={3} sx={{ color: "white" }}>
              Iniciar sesión
            </Title>
          </Group>

          <Divider pt="xs" />

          {/* {isError && (
              <Alert
                color="red"
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {JSON.stringify(error)}
              </Alert>
            )} */}

          <Box pt="xs">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="E-mail"
                sx={{ color: "black" }}
                placeholder="yo@email.com"
                id="email"
                {...form.getInputProps("email")}
                mb="xs"
              />

              <PasswordInput
                label="Contraseña"
                placeholder="Contraseña"
                id="password"
                {...form.getInputProps("password")}
              />

              <Group position="apart" mt="xl">
                <Link href="/autorizacion/recordar" passHref>
                  <Text
                    variant="link"
                    sx={{ cursor: "pointer", color: "white" }}
                    size="sm"
                  >
                    <b>¿Olvidaste la contraseña?</b>
                  </Text>
                </Link>
                <Button color="red" type="submit">
                  Ingresar
                </Button>
              </Group>
            </form>
          </Box>
        </>
      </Card>
      <Card
        sx={{
          width: 360,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,.4)",
        }}
        mx="auto"
        p="lg"
      >
        <Text size="md" sx={{ color: "white" }}>
          Si todavía no tenés cuenta registrate
        </Text>{" "}
        <Link href="http://localhost:3005/usuarios/registrar-usuario" passHref>
          <Text variant="link" sx={{ cursor: "pointer" }} size="md" pl="4px">
            aquí
          </Text>
        </Link>
      </Card>
    </Stack>
  );
};
