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
  Checkbox,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { DatePicker, getMonthsNames } from "@mantine/dates";
import { crearUsuario } from "../../hooks/useUsuario";
import { IUsuario } from "../../interfaces/usuario";
import { TerminosYCondiciones } from "../reportes/terminosCondiciones/terminosCondiciones";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { X } from "tabler-icons-react";
export const FormularioRegistrarUsuario = () => {
  const [open, setOpen] = useState(false);

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
      telefono: "",
      direccion: "",
    },
    validate: {
      nombre: (value: any) => (value.length <= 0 ? "Ingrese un nombre" : null),
      apellido: (value: any) =>
        value.length <= 0 ? "Ingrese un apellido" : null,
      telefono: (value: any) =>
        value.length <= 6 ? "Ingrese un teléfono" : null,
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
    const datosUsuario = {
      DNI: values.DNI,
      apellido: values.apellido,
      direccion: values.direccion,
      email: values.email,
      fecha_nacimiento: values.fecha_nacimiento,
      nombre: values.nombre,
      password: values.password,
      rol: "VISITANTE",
      telefono: values.telefono.toString(),
    };
    console.log(values.terminosCondiciones);
    // console.log(usuario);
    if (values.terminosCondiciones) {
      crearUsuario(datosUsuario);
    } else {
      showNotification({
        color: "red",
        icon: <X />,
        title: "No puede registrarse sin aceptar los términos y condiciones.",
        message: "",
      });
    }

    return values;
  };

  return (
    <Stack spacing="xs">
      <TerminosYCondiciones open={open} setOpen={setOpen} />
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
                    placeholder="Seleccione una fecha"
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

              <Checkbox
                mt="md"
                sx={{ justifyContent: "center" }}
                label="Acepto los términos y condiciones"
                {...form.getInputProps("terminosCondiciones", {
                  type: "checkbox",
                })}
              />
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
          <Group position="center" mt={6}>
            <Button variant="subtle" onClick={() => setOpen(true)}>
              Ver términos y condiciones
            </Button>
          </Group>
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
