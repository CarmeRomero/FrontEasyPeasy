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
  Menu,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dots, Edit, Trash } from "tabler-icons-react";
import { useMutateArticulo } from "../../hooks/useArticulos";
import { useCategorias } from "../../hooks/useCategoria";
import { IArticulo } from "../../interfaces/articulo";
import { useState, useRef, useEffect, useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { RegistrarCategoria } from "./registrarCategoria";

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

  const [open, setOpen] = useState(false);
  const { mutate, error, isLoading } = useMutateArticulo();
  const { data: categorias } = useCategorias();

  const handleSubmit = (values: any) => {
    const articulo: IArticulo = {
      codigo: values.codigo,
      id_categoria: parseInt(values.id_categoria),
      descripcion: values.descripcion,
      precio_venta: values.precio_venta,
      estado_alta: values.estado_alta,
    };
    mutate(articulo, {
      onSuccess: () => {
        console.log(values);
      },
    });
  };

  const handleChange = (value: any) => {
    form.setFieldValue("id_categoria", value);
  };

  // const btnAcciones = ({ data }: ICellRendererParams) => {
  //   const { mutate, isLoading, error } = useMutateAnularArticulo();

  //   const { refetch } = useArticulos();

  //   //ELIMINAR ARTICULO
  //   const handleDelete = (value: any) => {
  //     mutate(value, {
  //       onSuccess: () => {
  //         refetch();
  //       },
  //     });
  //   };
  // };

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
                cols={2}
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
                  id="categorias"
                  onChange={handleChange}
                  searchable
                  autoComplete="off"
                  maxDropdownHeight={230}
                  nothingFound="No hay categorías"
                  data={
                    categorias
                      ? categorias.map(({ descripcion, id }: any) => ({
                          label: descripcion,
                          value: id,
                        }))
                      : []
                  }
                />
                <RegistrarCategoria open={open} setOpen={setOpen} />
                <Menu
                  placement="end"
                  control={
                    <Button
                      variant="light"
                      color="grape"
                      px={10}
                      my={10}
                      sx={{ height: "30px" }}
                    >
                      <Dots strokeWidth={2} size={17} />
                    </Button>
                  }
                  withArrow
                >
                  <Menu.Item
                    icon={<Edit size={14} />}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Agregar categoría
                  </Menu.Item>
                  <Menu.Item
                    icon={<Trash size={14} />}
                    onClick={() => {
                      // handleDelete(data.id);
                    }}
                  >
                    Eliminar
                  </Menu.Item>
                </Menu>
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
