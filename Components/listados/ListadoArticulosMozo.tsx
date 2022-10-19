import { useArticulos } from "../../hooks/useArticulos";
import {
  Box,
  Button,
  Select,
  SimpleGrid,
  Card,
  TextInput,
  Textarea,
  Grid,
  Group,
  Text,
  Switch,
  ActionIcon,
  Code,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IPedido } from "../../interfaces/registrarPedido";
import { useMutateCrearPedido } from "../../hooks/usePedidos";
import { Trash } from "tabler-icons-react";

export const ListadoArticulosMozo = () => {
  const form = useForm<IPedido>({
    initialValues: {
      id_mesa: null,
      id_usuario: 7,
      fecha_hora_pedido: null,
      num_pedido: null,
      fecha_hora_entrega: null,
      observaciones: "",
      estado: "",
      Detalle_Pedidos: [],
      // employees: [{ name: "", active: false }],
    },
    validate: {},
  });
  const { mutate, error, isLoading } = useMutateCrearPedido();

  const handleSubmit = (values: any) => {
    const pedido: IPedido = {
      id_mesa: parseInt(values.id_mesa),
      id_usuario: 7,
      fecha_hora_pedido: new Date(),
      num_pedido: 1,
      fecha_hora_entrega: null,
      observaciones: values.observaciones,
      estado: "PENDIENTE",
      Detalle_Pedidos: [],
    };

    mutate(pedido, {
      onSuccess: () => {
        console.log(values);
      },
    });
  };
  // const handleChange = (value: any) => {
  //   form.setFieldValue("id_mesa", value);
  // };
  const handleChangeArticulo = (value: any) => {
    console.log(value);
    form.setFieldValue(`Detalle_Pedidos.0.id_articulo`, value);
  };

  const { data: articulos } = useArticulos();

  const fields = form.values.Detalle_Pedidos.map((item, index) => (
    <Group key={index} mt="xs">
      <Select
        label="Seleccione un artículo"
        placeholder="Seleccione una"
        id="articulo"
        onChange={handleChangeArticulo}
        // searchable
        autoComplete="off"
        maxDropdownHeight={230}
        nothingFound="No hay artículos"
        data={
          articulos
            ? articulos.map(({ id, descripcion }: any) => ({
                label: descripcion,
                value: id,
              }))
            : []
        }
      />
      <NumberInput
        label="Cantidad"
        sx={{}}
        {...form.getInputProps(`Detalle_Pedidos.${index}.name`)}
      />
      {/* <TextInput
        placeholder="John Doe"
        sx={{ flex: 1 }}
        {...form.getInputProps(`employees.${index}.name`)}
      /> */}
      {/* <Switch
        label="Active"
        {...form.getInputProps(`employees.${index}.active`, {
          type: "checkbox",
        })}
      /> */}
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("Detalle_Pedidos", index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col md={8}>
            <Text weight={500} size="sm" my={3}>
              Seleccione el articulo
            </Text>
            <Card p="lg" radius="md" withBorder>
              <Box>
                <Box sx={{ maxWidth: 500 }} mx="auto">
                  {fields.length > 0 ? (
                    <Box></Box>
                  ) : (
                    <Text color="dimmed" align="center">
                      No hay ningún artículo
                    </Text>
                  )}

                  {fields}

                  <Group position="center" mt="md">
                    <Button
                      onClick={() =>
                        form.insertListItem("Detalle_Pedidos", {
                          id_articulo: null,
                          cantidad: null,
                          precio: null,
                        })
                      }
                    >
                      Agregar artículo
                    </Button>
                  </Group>
                </Box>
              </Box>
            </Card>
          </Grid.Col>
          <Grid.Col md={4}>
            <Select
              label="Seleccione una mesa"
              placeholder="Seleccione una"
              id="mesas"
              // onChange={handleChange}
              // searchable
              autoComplete="off"
              maxDropdownHeight={230}
              nothingFound="No hay mesas"
              data={[
                { value: "1", label: "Mesa 1" },
                { value: "2", label: "Mesa 2" },
                { value: "3", label: "Mesa 3" },
              ]}
            />

            <Textarea
              placeholder="Observaciones"
              label="Observaciones"
              radius="md"
              my="xs"
              {...form.getInputProps("observaciones")}
            />
            <Button color="grape" type="submit" mt="xs" sx={{ width: "100%" }}>
              Registrar pedido
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};
