import { Button, Group, TextInput, Grid, Table } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Trash } from "tabler-icons-react";
import {
  useCategorias,
  useMutateCategoria,
  useMutateCategoriaEliminar,
} from "../../hooks/useCategoria";

export const RegistrarCategoria = () => {
  const formulario = useForm({
    initialValues: {
      descripcion: "",
    },
    validate: {
      descripcion: (value: any) =>
        value.length <= 0 ? "Ingrese un nombre para la categoría" : null,
    },
  });

  const { data: categoria, refetch } = useCategorias();
  const { mutate } = useMutateCategoria();
  const handleSubmitCategoria = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        console.log(values);
        refetch();
      },
    });
  };

  const { mutate: eliminar } = useMutateCategoriaEliminar();
  //ELIMINAR CATEGORIA
  const handleDelete = (value: any) => {
    eliminar(value, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const rows = categoria
    ? categoria.map((cat: any) => (
        <tr key={cat.id}>
          <td>{cat.descripcion}</td>
          <td>
            <Button
              variant="light"
              color="red"
              px={10}
              my={30}
              onClick={() => {
                handleDelete(cat.id);
              }}
            >
              <Trash strokeWidth={2} size={17} />
              Eliminar Categoría
            </Button>
          </td>
        </tr>
      ))
    : [];

  return (
    <>
      <form onSubmit={formulario.onSubmit(handleSubmitCategoria)}>
        <Grid>
          <Grid.Col xs={6} md={6}>
            <TextInput
              label="Categoría"
              placeholder="Ingrese una categoría"
              id="categoria"
              {...formulario.getInputProps("descripcion")}
              mb="xs"
            />
          </Grid.Col>
          <Grid.Col xs={6} md={6}>
            <Group position="center" mt="xl" my="lg">
              <Button
                variant="outline"
                fullWidth
                color="grape"
                radius="xl"
                size="md"
                type="submit"
              >
                Agregar
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
      <Grid px="xl">
        <Table horizontalSpacing="lg" verticalSpacing="xs">
          <thead>
            <tr>
              <th>Categoría </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Grid>
    </>
  );
};
