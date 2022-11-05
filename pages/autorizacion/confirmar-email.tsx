import {
  Group,
  Button,
  Card,
  Title,
  Divider,
  LoadingOverlay,
  Center,
} from "@mantine/core";
import { useMutateConfirmarEmail } from "../../hooks/useAutorizacion";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RecordarPage = () => {
  const { query } = useRouter();

  const { mutate, isSuccess, error, data, isLoading } =
    useMutateConfirmarEmail();

  useEffect(() => {
    if (query.token) {
      mutate({ token: query.token as string });
    }
  }, [query]);

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
          <Title order={3}>Confirmación de cuenta</Title>
        </Group>

        <Divider pt="xs" />

        {error && <Center>Ocurrió un error al verificar su correo.</Center>}
        {isSuccess && (
          <>
            <Center pt={5}>Verificación de correo exitosa.</Center>

            <NextLink href="/autorizacion/ingreso" passHref>
              <Button mt={20} type="submit" sx={{ width: "100%" }}>
                Ir al ingreso
              </Button>
            </NextLink>
          </>
        )}
      </Card>
    </AuthLayout>
  );
};

export default RecordarPage;
