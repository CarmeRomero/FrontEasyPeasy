import { useArticulos } from "../../hooks/useArticulos";
import {
  Box,
  Button,
  Select,
  Card,
  Textarea,
  Grid,
  Group,
  Text,
  ActionIcon,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IPedido } from "../../interfaces/registrarPedido";
import { useMutateCrearPedido } from "../../hooks/usePedidos";
import { Trash } from "tabler-icons-react";
import { useUnoSolo } from "../../hooks/useUsuario";

export const ListadoArticulosMozo = () => {
  const { data: usuario } = useUnoSolo();

  const form = useForm<IPedido>({
    initialValues: {
      id_mesa: null,
      id_usuario: null,
      fecha_hora_pedido: null,
      fecha_hora_entrega: null,
      observaciones: "",
      estado: "",
      Detalle_Pedidos: [],
    },
    validate: {
      id_mesa: (value: any) => (value <= 0 ? "Ingresar una mesa" : null),
      fecha_hora_pedido: (value: any) =>
        value != null ? "Ingresar fecha y hora de pedido" : null,
      // Detalle_Pedidos: (value: any) =>
      //   (value = [] ? "Seleccione los productos" : null),
    },
  });
  const { mutate, error, isLoading } = useMutateCrearPedido();

  const handleSubmit = (values: any) => {
    const pedido: IPedido = {
      id_mesa: parseInt(values.id_mesa),
      id_usuario: usuario.id,
      fecha_hora_pedido: new Date(),
      fecha_hora_entrega: null,
      observaciones: values.observaciones,
      estado: "PENDIENTE",
      Detalle_Pedidos: values.Detalle_Pedidos,
    };
    mutate(pedido, {
      onSuccess: () => {
        console.log(values);
      },
    });
  };

  const handleChangeArticulo = async (event: any, index: any) => {
    form.setFieldValue(`Detalle_Pedidos.${index}.id_articulo`, event);
    const articulo = articulos.find((e: any) => e.id == event);
    form.setFieldValue(
      `Detalle_Pedidos.${index}.precio`,
      articulo.precio_venta
    );
  };

  const handleChangeMesa = (event: any) => {
    form.setFieldValue(`id_mesa`, event);
  };

  const { data: articulos } = useArticulos();

  const fields = form.values.Detalle_Pedidos.map((item, index) => (
    <Group key={index} mt="xs">
      <Grid>
        <Grid.Col xs={7} md={8}>
          <Select
            label="Seleccione un artículo"
            placeholder="Seleccione una"
            id="articulo"
            onChange={(e) => handleChangeArticulo(e, index)}
            autoComplete="off"
            searchable
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
        </Grid.Col>

        <Grid.Col xs={3} md={2}>
          <NumberInput
            label="Cantidad"
            hideControls
            sx={{}}
            {...form.getInputProps(`Detalle_Pedidos.${index}.cantidad`)}
          />
        </Grid.Col>
        <Grid.Col xs={2} md={2}>
          <ActionIcon
            mt="xl"
            variant="outline"
            radius="lg"
            color="red"
            onClick={() => form.removeListItem("Detalle_Pedidos", index)}
          >
            <Trash size={18} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </Group>
  ));

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col md={12}>
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
                      color="grape"
                      radius="lg"
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
          <Grid.Col md={12}>
            <Select
              label="Seleccione una mesa"
              placeholder="Seleccione una"
              id="mesas"
              onChange={handleChangeMesa}
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

            <Button
              color="grape"
              radius="lg"
              variant="outline"
              type="submit"
              mt="xs"
              sx={{ width: "100%" }}
            >
              Registrar pedido
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};
