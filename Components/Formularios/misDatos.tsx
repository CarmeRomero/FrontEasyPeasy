import {
  Box,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
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
  });

  const { data } = useUnoSolo();
  useEffect(() => {
    if (data) {
      const fecha = new Date(data[0].fecha_nacimiento);
      data[0].fecha_nacimiento = fecha;
      form.setValues(data[0]);
    }
  }, [data]);

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
                id="nombre"
                {...form.getInputProps("nombre")}
                mb="xs"
              />
              <TextInput
                label="Apellido"
                id="apellido"
                {...form.getInputProps("apellido")}
                mb="xs"
              />
              <NumberInput
                label="DNI"
                id="dni"
                {...form.getInputProps("DNI")}
                mb="xs"
                disabled
              />
              <DatePicker
                locale="es"
                label="Fecha de nacimiento"
                id="fecha_nacimiento"
                {...form.getInputProps("fecha_nacimiento")}
                mb="xs"
              />

              <NumberInput
                label="Teléfono"
                hideControls
                id="telefono"
                {...form.getInputProps("telefono")}
                mb="xs"
              />
              <TextInput
                label="Dirección"
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
                id="e-mail"
                {...form.getInputProps("email")}
                mb="xs"
                disabled
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
                // onClick={() => console.log(usuario)}
              >
                Registrarse
              </Button>
            </Group>
          </form>
        </Box>
      </Card>
    </Stack>
  );
};
