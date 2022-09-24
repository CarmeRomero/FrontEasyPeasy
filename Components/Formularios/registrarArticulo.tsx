import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Select,
  Switch,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutateArticulo } from "../../hooks/useArticulos";
import { IArticulo } from "../../interfaces/articulo";

export const FormularioRegistrarArticulo = () => {
  const form = useForm<IArticulo>({
    initialValues: {
      codigo: "",
      id_categoria: null,
      descripcion: "",
      precio_venta: null,
      estado_alta: false,
    },
    validate: {},
  });

  const { mutate, error, isLoading } = useMutateArticulo();

  const handleSubmit = (values: any) => {
    // console.log(values.id_categoria);

    const articulo: IArticulo = {
      codigo: values.codigo,
      id_categoria: parseInt(values.id_categoria),
      descripcion: values.descripcion,
      precio_venta: values.precio_venta,
      estado_alta: values.estado_alta,
    };

    console.log(articulo);

    mutate(articulo, {
      onSuccess: () => {
        console.log(values);
      },
    });
  };

  return (
    <Stack spacing="xs">
      <Card sx={{ width: "100%" }} mx="auto" p="lg" mt="lg">
        <>
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
                  label="Código"
                  placeholder="Código"
                  id="codigo"
                  {...form.getInputProps("codigo")}
                  mb="xs"
                />
                <NumberInput
                  placeholder="Ingrese el precio"
                  label="Precio de venta"
                  hideControls
                  id="precio"
                  {...form.getInputProps("precio_venta")}
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
                <Select
                  label="Categoría"
                  placeholder="Seleccione una"
                  data={[
                    { value: "1", label: "React" },
                    { value: "2", label: "Angular" },
                    { value: "3", label: "Svelte" },
                    { value: "4", label: "Vue" },
                  ]}
                  {...form.getInputProps("id_categoria")}
                />

                <Textarea
                  placeholder="Ingrese una descripción"
                  label="Descripción"
                  {...form.getInputProps("descripcion")}
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
                <Switch
                  label="Habilitar"
                  color="grape"
                  {...form.getInputProps("estado_alta")}
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
                  Registrar artículo
                </Button>
              </Group>
            </form>
          </Box>
        </>
      </Card>
    </Stack>
  );
};
