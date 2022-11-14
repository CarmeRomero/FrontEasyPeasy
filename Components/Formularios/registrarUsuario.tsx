import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  PasswordInput,
  Grid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { DatePicker, getMonthsNames } from "@mantine/dates";
import { crearUsuario } from "../../hooks/useUsuario";
import { IUsuario } from "../../interfaces/usuario";

export const FormularioRegistrarUsuario = () => {
  const form = useForm<IUsuario>({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      confirmPassword: "",
      rol: "VISITANTE",
      DNI: null,
      fecha_nacimiento: null,
      telefono: null,
      direccion: "",
    },
    validate: {
      nombre: (value: any) => (value.length <= 0 ? "Ingrese un nombre" : null),
      apellido: (value: any) =>
        value.length <= 0 ? "Ingrese un apellido" : null,
      email: (value: any) =>
        /^\S+@\S+$/.test(value) ? null : "Email inválido",
      password: (value: any) =>
        value.length < 6
          ? "La contraseña debe contener al menos 6 caracteres"
          : null,
      confirmPassword: (value: any, values: any) =>
        value !== values.password ? "Las contraseñas no son iguales" : null,
      DNI: (values: any) =>
        values === null
          ? "Ingrese el DNI"
          : values < 12000000
          ? "You must be at least 18"
          : null,
    },
  });

  // const { mutate, error, isLoading } = useMutateCliente();

  const handleSubmit = (values: any) => {
    console.log(values);
    crearUsuario(values);
    return values;
  };

  return (
    <Stack spacing="xs">
      <Card
        sx={{
          width: "100%",
          boxShadow:
            "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
          opacity: 0.95,
          color: "rgb(235, 232, 242)",
        }}
        mx="lg"
        my="md"
        p="lg"
        mt="lg"
      >
        <>
          {/* <LoadingOverlay visible={isLoading} />
              <Group position="center" mb="md">
                <Title order={3}>Alta de cliente</Title>
              </Group>
  
              <Divider pt="xs" />
  
              {error && (
                <Alert
                  color="red"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {error.message}
                </Alert>
              )} */}

          <Box>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Grid>
                <Grid.Col xs={4}>
                  <TextInput
                    label="Nombre"
                    placeholder="Nombre"
                    id="nombre"
                    {...form.getInputProps("nombre")}
                    mb="xs"
                  />

                  <DatePicker
                    locale="es"
                    placeholder="Pick date"
                    label="Fecha de nacimiento"
                    id="fecha_nacimiento"
                    {...form.getInputProps("fecha_nacimiento")}
                    mb="xs"
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <TextInput
                    label="Apellido"
                    placeholder="Apellido"
                    id="apellido"
                    {...form.getInputProps("apellido")}
                    mb="xs"
                  />

                  <NumberInput
                    placeholder="Teléfono"
                    label="Teléfono"
                    hideControls
                    id="telefono"
                    {...form.getInputProps("telefono")}
                    mb="xs"
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <NumberInput
                    label="DNI"
                    placeholder="DNI"
                    id="dni"
                    {...form.getInputProps("DNI")}
                    mb="xs"
                    hideControls
                  />
                  <TextInput
                    label="Dirección"
                    placeholder="Dirección"
                    id="direccion"
                    {...form.getInputProps("direccion")}
                    mb="xs"
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col xs={12}>
                  <TextInput
                    label="E-mail"
                    placeholder="E-mail"
                    id="e-mail"
                    {...form.getInputProps("email")}
                    mb="xs"
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col xs={6}>
                  <PasswordInput
                    placeholder="Contraseña"
                    label="Contraseña"
                    id="contrsenia"
                    {...form.getInputProps("password")}
                    mb="xs"
                  />
                </Grid.Col>
                <Grid.Col xs={6}>
                  <PasswordInput
                    placeholder="Contraseña"
                    label="Confirmar contraseña"
                    id="confirmarContrasenia"
                    {...form.getInputProps("confirmPassword")}
                    mb="xs"
                  />
                </Grid.Col>
              </Grid>

              <Group position="center" mt="xl" my="lg">
                <Button
                  variant="outline"
                  fullWidth
                  color="grape"
                  radius="xl"
                  size="md"
                  type="submit"
                >
                  Registrarse
                </Button>
              </Group>
            </form>
          </Box>

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Text size="md" sx={{ color: "black" }}>
              Si ya tenés cuenta ingresa
            </Text>{" "}
            <Link href="http://localhost:3005/autorizacion/ingreso" passHref>
              <Text
                variant="link"
                sx={{ cursor: "pointer" }}
                size="md"
                pl="4px"
              >
                aquí
              </Text>
            </Link>
          </Box>
        </>
      </Card>
    </Stack>
  );
};
