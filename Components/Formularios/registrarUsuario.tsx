import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  PasswordInput,
  SimpleGrid,
  Stack,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
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
      <Card sx={{ width: "100%" }} mx="auto" p="lg" mt="lg">
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
              <SimpleGrid
                cols={2}
                spacing="lg"
                breakpoints={[
                  { maxWidth: "md", cols: 3, spacing: "md" },
                  { maxWidth: "sm", cols: 2, spacing: "sm" },
                  { maxWidth: "xs", cols: 1, spacing: "sm" },
                ]}
                my="md"
              >
                <TextInput
                  label="Nombre"
                  placeholder="Nombre"
                  id="nombre"
                  {...form.getInputProps("nombre")}
                  mb="xs"
                />
                <TextInput
                  label="Apellido"
                  placeholder="Apellido"
                  id="apellido"
                  {...form.getInputProps("apellido")}
                  mb="xs"
                />
                <NumberInput
                  label="DNI"
                  placeholder="DNI"
                  id="dni"
                  {...form.getInputProps("DNI")}
                  mb="xs"
                />
                <DatePicker
                  locale="es"
                  placeholder="Pick date"
                  label="Fecha de nacimiento"
                  id="fecha_nacimiento"
                  {...form.getInputProps("fecha_nacimiento")}
                  mb="xs"
                  // withAsterisk
                />

                <NumberInput
                  // defaultValue={18}
                  placeholder="Teléfono"
                  label="Teléfono"
                  hideControls
                  id="telefono"
                  {...form.getInputProps("telefono")}
                  mb="xs"
                />
                <TextInput
                  label="Dirección"
                  placeholder="Dirección"
                  id="direccion"
                  {...form.getInputProps("direccion")}
                  mb="xs"
                />
              </SimpleGrid>
              <SimpleGrid
                cols={1}
                spacing="lg"
                breakpoints={[
                  { maxWidth: "md", cols: 3, spacing: "md" },
                  { maxWidth: "sm", cols: 2, spacing: "sm" },
                  { maxWidth: "xs", cols: 1, spacing: "sm" },
                ]}
                my="md"
              >
                <TextInput
                  label="E-mail"
                  placeholder="E-mail"
                  id="e-mail"
                  {...form.getInputProps("email")}
                  mb="xs"
                />
              </SimpleGrid>
              <SimpleGrid
                cols={2}
                spacing="lg"
                breakpoints={[
                  { maxWidth: "md", cols: 3, spacing: "md" },
                  { maxWidth: "sm", cols: 2, spacing: "sm" },
                  { maxWidth: "xs", cols: 1, spacing: "sm" },
                ]}
                my="md"
              >
                <PasswordInput
                  placeholder="Contraseña"
                  label="Contraseña"
                  // description="Password must include at least one letter, number and special character"
                  // withAsterisk
                  id="contrsenia"
                  {...form.getInputProps("password")}
                  mb="xs"
                />

                <PasswordInput
                  placeholder="Contraseña"
                  label="Confirmar contraseña"
                  // description="Password must include at least one letter, number and special character"

                  id="confirmarContrasenia"
                  {...form.getInputProps("confirmPassword")}
                  mb="xs"
                />
              </SimpleGrid>

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
        </>
      </Card>
    </Stack>
  );
};
