import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  Stack,
  Grid,
  TextInput,
  Select,
  Switch,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { BoxMargin, Dots, Edit, Trash } from "tabler-icons-react";
import {
  useArticulosMismaCategoria,
  useMutateArticulo,
} from "../../hooks/useArticulos";
import {
  useCategorias,
  useMutateCategoriaEliminar,
} from "../../hooks/useCategoria";
import { IArticulo } from "../../interfaces/articulo";
import { useState, useRef, useEffect, useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { RegistrarCategoria } from "./registrarCategoria";

export const FormularioRegistrarArticulo = () => {
  const [id_categoria, setIdCategoria] = useState(null);

  const form = useForm<IArticulo>({
    initialValues: {
      codigo: "",
      id_categoria: null,
      descripcion: "",
      precio_venta: null,
      estado_alta: false,
    },
    validate: {
      codigo: (value: any) => (value.length <= 0 ? "Ingrese un codigo" : null),
      id_categoria: (value: any) =>
        value === "" ? "Seleccione categoria" : null,
      descripcion: (value: any) =>
        value.length <= 1 ? "Ingrese una descripcion" : null,
      precio_venta: (value: any) => (value <= 0 ? "Ingrese un precio" : null),
    },
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
    setIdCategoria(value);
  };

  // const { refetch } = useCategorias();

  // const { mutate: mutateCategoria } = useMutateCategoriaEliminar();

  // //ELIMINAR CATEGORIA
  // const handleDelete = (value: any) => {
  //   mutateCategoria(value, {
  //     onSuccess: () => {
  //       refetch();
  //     },
  //   });
  // };

  return (
    <Stack spacing="xs">
      <Card sx={{ width: "100%" }} mx="auto" p="lg" mt="lg">
        <>
          <Box>
            {/* <RegistrarCategoria open={open} setOpen={setOpen} /> */}

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Grid>
                <Grid.Col md={12}>
                  <TextInput
                    label="Código"
                    placeholder="Código"
                    id="codigo"
                    {...form.getInputProps("codigo")}
                  />
                  <TextInput
                    placeholder="Ingrese una descripción"
                    label="Descripción"
                    {...form.getInputProps("descripcion")}
                  />
                  <NumberInput
                    placeholder="Ingrese el precio"
                    label="Precio de venta"
                    hideControls
                    id="precio"
                    {...form.getInputProps("precio_venta")}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col md={9}>
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
                </Grid.Col>

                {/* <Grid.Col md={1}>
                  <Menu
                    placement="end"
                    control={
                      <Button variant="light" color="grape" px={10} my={30}>
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
                        handleDelete(id_categoria);
                      }}
                    >
                      Eliminar
                    </Menu.Item>
                  </Menu>
                </Grid.Col> */}
                <Grid.Col md={3} mt={35} pl={30}>
                  <Switch
                    label="Habilitar"
                    color="grape"
                    {...form.getInputProps("estado_alta")}
                  />
                </Grid.Col>
              </Grid>

              <Group position="center" mt="xl" my="md">
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
