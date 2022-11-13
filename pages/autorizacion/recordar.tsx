import {
  Group,
  Button,
  Card,
  Title,
  Divider,
  LoadingOverlay,
  TextInput,
  Center,
} from "@mantine/core";
import Link from "next/link";

import {
  useMutateConfirmarEmail,
  useMutateRecuperar,
} from "../../hooks/useAutorizacion";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { useForm } from "@mantine/form";

const ConfirmarEmailPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    },
  });

  // const { mutate, isSuccess, error, data, isLoading } =
  //   useMutateConfirmarEmail();

  const { mutate, isSuccess, error, data, isLoading } = useMutateRecuperar();

  const EnviarEmail = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
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
        }}
        mx="auto"
        p="lg"
      >
        <LoadingOverlay visible={isLoading} />
        <Group position="center" mb="md">
          <Title order={3}>Recuperación de cuenta</Title>
        </Group>

        <Divider pt="xs" />

        {/* {error && <Center>Ocurrió un error al verificar su correo.</Center>} */}

        <form onSubmit={form.onSubmit(EnviarEmail)}>
          <TextInput
            label="E-mail"
            placeholder="yo@email.com"
            {...form.getInputProps("email")}
            mb="xs"
          />

          <Group position="apart" mt="xl">
            <Link
              color="blue"
              href="http://localhost:3005/autorizacion/ingreso"
              passHref
            >
              Volver
            </Link>
            <Button type="submit">Enviar</Button>
          </Group>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default ConfirmarEmailPage;
