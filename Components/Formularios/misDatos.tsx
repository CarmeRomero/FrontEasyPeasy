import {
  Box,
  Card,
  Group,
  NumberInput,
  Grid,
  Stack,
  TextInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { useMutateActualizarUsuario, useUnoSolo } from "../../hooks/useUsuario";
import { useEffect } from "react";
import { IDatosUsuario } from "../../interfaces/datos-usuario";
import { IActualizarDatosUsuario } from "../../interfaces/actualizar-datos.usuario";

export const FormularioDatosUsuario = () => {
  const form = useForm<IDatosUsuario>({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      rol: "",
      DNI: null,
      fecha_nacimiento: null,
      telefono: null,
      direccion: "",
    },
    validate: {
      nombre: (value: any) => (value.length <= 2 ? "Ingrese nombre" : null),
      apellido: (value: any) => (value.length <= 2 ? "Ingrese apellido" : null),
      fecha_nacimiento: (value: any) =>
        value == null ? "Ingrese una fecha de nacimiento" : null,
      telefono: (value: any) =>
        value.length <= 6 ? "Ingrese un teléfono" : null,
      direccion: (value: any) =>
        value.length <= 5 ? "Ingrese una dirección" : null,
    },
  });

  const { data: usuario } = useUnoSolo();
  console.log(usuario);

  useEffect(() => {
    if (usuario) {
      form.setValues(usuario);
      const fecha = new Date(usuario.fecha_nacimiento);
      usuario.fecha_nacimiento = fecha;
    }
    console.log(usuario);
  }, [usuario]);

  const { mutate, error, isLoading } = useMutateActualizarUsuario();

  const handleSubmit = (values: any) => {
    const datosEnviar: IActualizarDatosUsuario = {
      nombre: values.nombre,
      apellido: values.apellido,
      fecha_nacimiento: values.fecha_nacimiento,
      telefono: values.telefono,
      direccion: values.direccion,
    };
    mutate(datosEnviar, {
      onSuccess: () => {
        console.log(values);
      },
    });
    return values;
  };

  return (
    <Stack spacing="xs">
      <Card sx={{ width: "100%" }} mx="auto" p="lg" mt="lg">
        <Box>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col md={6}>
                <TextInput
                  label="Nombre"
                  id="nombre"
                  {...form.getInputProps("nombre")}
                />
                <TextInput
                  label="Apellido"
                  id="apellido"
                  {...form.getInputProps("apellido")}
                />
                <NumberInput
                  label="DNI"
                  id="dni"
                  {...form.getInputProps("DNI")}
                  disabled
                />
              </Grid.Col>

              <Grid.Col md={6}>
                <DatePicker
                  locale="es"
                  label="Fecha de nacimiento"
                  id="fecha_nacimiento"
                  {...form.getInputProps("fecha_nacimiento")}
                />

                <NumberInput
                  label="Teléfono"
                  hideControls
                  id="telefono"
                  {...form.getInputProps("telefono")}
                />
                <TextInput
                  label="Dirección"
                  id="direccion"
                  {...form.getInputProps("direccion")}
                />
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col md={12}>
                <TextInput
                  label="E-mail"
                  id="e-mail"
                  {...form.getInputProps("email")}
                  mb="xs"
                  disabled
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
                // onClick={() => console.log(usuario)}
              >
                Guardar
              </Button>
            </Group>
          </form>
        </Box>
      </Card>
    </Stack>
  );
};
