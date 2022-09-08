import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Group,
  LoadingOverlay,
  NumberInput,
  PasswordInput,
  SimpleGrid,
  Stack,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { crearUsuario } from "../../hooks/useUsuario";
import { IUsuario } from "../../interfaces/usuario";

export const FormularioRegistrarUsuario = () => {
  const form = useForm<IUsuario>({
    initialValues: {
      nombre: "Carmela ",
      apellido: "Romero",
      email: "carme@hotmail.com",
      password: "asdasd",
      rol: "ADMIN",
      DNI: 36141576,
      fecha_nacimiento: new Date(),
      telefono: 3517561247,
      direccion: "Buenos Aires 891",
    },
    validationRules: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      // password: (value) => (value.length < 6 ? "Contraseña inválida" : null),
    },
  });

  // const { mutate, error, isLoading } = useMutateCliente();

  const handleSubmit = (values: IUsuario) => {
    console.log(values);
    crearUsuario(values);
    return values;
  };

  return (
    <AuthLayout title="registrarUsuario">
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
                <Tabs grow>
                  <Tabs.Tab label="Registrarse">
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
                      <TextInput
                        label="DNI"
                        placeholder="DNI"
                        id="dni"
                        {...form.getInputProps("DNI")}
                        mb="xs"
                      />
                      <TextInput
                        label="E-mail"
                        placeholder="E-mail"
                        id="e-mail"
                        {...form.getInputProps("email")}
                        mb="xs"
                      />

                      <PasswordInput
                        placeholder="Password"
                        label="Password"
                        // description="Password must include at least one letter, number and special character"
                        // withAsterisk
                        id="password"
                        {...form.getInputProps("password")}
                        mb="xs"
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
                      <TextInput
                        label="Fecha de nacimiento "
                        placeholder="Fecha de nacimiento"
                        id="fecha_nacimiento"
                        {...form.getInputProps("fecha_nacimiento")}
                        mb="xs"
                      />
                    </SimpleGrid>
                  </Tabs.Tab>
                </Tabs>

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
    </AuthLayout>
  );
};

export default FormularioRegistrarUsuario;
