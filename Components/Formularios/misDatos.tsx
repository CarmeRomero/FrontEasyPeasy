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
import { useUnoSolo } from "../../hooks/useUsuario";
import { useEffect } from "react";
import { IDatosUsuario } from "../../interfaces/datos-usuario";

export const FormularioDatosUsuario = () => {
  // const [usuario, setUsuario] = useState<IDatosUsuario>({
  //   nombre: "",
  //   apellido: "",
  //   email: "",
  //   rol: "",
  //   DNI: null,
  //   fecha_nacimiento: null,
  //   telefono: null,
  //   direccion: "",
  // });

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
      const fecha = new Date(data.fecha_nacimiento);
      console.log(fecha);
      data.fecha_nacimiento = fecha;
      form.setValues(data);
    }
  }, [data]);

  // const handleChange = (value: any) => {
  //   console.log(value);
  //   form.setFieldValue("nombre", data.nombre);
  // };

  // useEffect(() => {
  //   // setUsuario(data);
  //   form.setValues(data);
  //   // console.log(usuario);
  // }, [data]);

  return (
    <Stack spacing="xs">
      <Card sx={{ width: "100%" }} mx="auto" p="lg" mt="lg">
        <Box>
          <form onSubmit={form.onSubmit(() => console.log("algo"))}>
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
                // value={data.nombre}
                // onChange={handleChange}
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
            ></SimpleGrid>
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
