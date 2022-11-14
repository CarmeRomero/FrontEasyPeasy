import {
  PasswordInput,
  Group,
  Button,
  Card,
  Title,
  Divider,
  LoadingOverlay,
  TextInput,
  Center,
} from "@mantine/core";
import { useMutateCambiarPassword } from "../../hooks/useAutorizacion";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const CambioPasswordPage = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      password: "",
      repetir: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    // },
  });

  const { mutate, isSuccess, error, data, isLoading } =
    useMutateCambiarPassword();

  const EnviarPass = (values: any) => {
    const datos = {
      password: values.password,
      token: router.query.token as string,
    };

    mutate(datos, {
      onSuccess: () => {
        router.replace("/autorizacion/ingreso");
      },
    });
  };

  return (
    <AuthLayout title="Confirmación de cuenta">
      <Card
        sx={{
          width: 360,
          boxShadow:
            "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
          opacity: 0.95,
          color: "rgb(235, 232, 242)",
        }}
        mx="auto"
        p="lg"
      >
        <LoadingOverlay visible={isLoading} />
        <Group position="center" mb="md">
          <Title order={3} sx={{ color: "black" }}>
            Cambiar contraseña
          </Title>
        </Group>

        <Divider pt="xs" />

        {/* {error && <Center>Ocurrió un error al verificar su correo.</Center>} */}

        <form onSubmit={form.onSubmit(EnviarPass)}>
          <PasswordInput
            label="Nueva contraseña"
            placeholder="Contraseña"
            {...form.getInputProps("password")}
            mb="xs"
          />
          <PasswordInput
            label="Repetir nueva contraseña"
            placeholder="Repetir contraseña"
            {...form.getInputProps("repetir")}
            mb="xs"
          />

          <Group position="right" mt="xl">
            <Button type="submit">Enviar</Button>
          </Group>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default CambioPasswordPage;
