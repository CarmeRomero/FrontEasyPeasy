import { Button, Group, TextInput, Grid, Table, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Trash } from "tabler-icons-react";
import { useState } from "react";
import {
  useFormasPago,
  useMutateAnularFormaPago,
  useMutateFormaPago,
} from "../../hooks/useFormasPago";

export const RegistrarFormaPago = () => {
  const [checked, setChecked] = useState(false);
  const formulario = useForm({
    initialValues: {
      descripcion: "",
      estado: true,
    },
    validate: {
      descripcion: (value: any) =>
        value.length <= 0 ? "Ingrese un nombre para la forma de pago" : null,
    },
  });

  const { data: formaPago, refetch } = useFormasPago();
  const { mutate } = useMutateFormaPago();

  const handleSubmitFormaPago = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        console.log(values);
        formulario.reset();

        refetch();
      },
    });
  };

  const { mutate: eliminar } = useMutateAnularFormaPago();

  const handleDelete = (value: any) => {
    console.log(value);

    eliminar(value, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  console.log(checked);
  const rows = formaPago
    ? formaPago.map((formaPago: any) => (
        <tr key={formaPago.id}>
          <td>{formaPago.descripcion}</td>
          {/* <td>
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          </td> */}
          <td>
            <Button
              variant="light"
              color="red"
              px={10}
              my={30}
              onClick={() => {
                handleDelete(formaPago.id);
              }}
            >
              <Trash strokeWidth={2} size={17} />
              Eliminar Forma de pago
            </Button>
          </td>
        </tr>
      ))
    : [];

  return (
    <>
      <form onSubmit={formulario.onSubmit(handleSubmitFormaPago)}>
        <Grid>
          <Grid.Col xs={6} md={6}>
            <TextInput
              label="Forma de Pago"
              placeholder="Ingrese una nueva forma de pago"
              id="forma-pago"
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
              <th>Forma de pago </th>
              {/* <th>Activo/inactivo</th> */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Grid>
    </>
  );
};
