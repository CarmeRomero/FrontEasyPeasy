import { Button, Group, TextInput, Grid, Table } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Box, Check, Trash } from "tabler-icons-react";
import {
  useCategorias,
  useMutateCategoria,
  useMutateCategoriaEliminar,
} from "../../hooks/useCategoria";
import { useModals } from "@mantine/modals";

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
        formulario.reset();
      },
    });
  };

  const { mutate: eliminar } = useMutateCategoriaEliminar();

  const modals = useModals();
  const openDeleteModal = (value: any) =>
    modals.openConfirmModal({
      title: "¿Está seguro que quiere eliminar esta categoría?",
      centered: true,
      labels: { confirm: "Eliminar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        eliminar(value, {
          onSuccess: () => {
            showNotification({
              color: "green",
              icon: <Check />,
              title: "Categoría eliminada",
              message: "",
            });
            refetch();
          },
        });
      },
    });

  const rows = categoria
    ? categoria.map((cat: any) => (
        <tr key={cat.id}>
          <td>{cat.descripcion}</td>
          <td>
            <Button
              variant="light"
              color="red"
              // px={10}
              // my={30}
              onClick={() => {
                openDeleteModal(cat.id);
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

      <Grid>
        <Table horizontalSpacing="xl">
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
