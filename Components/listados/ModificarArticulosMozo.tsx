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
  Code,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IPedido } from "../../interfaces/registrarPedido";
import { usePedido } from "../../hooks/usePedidos";
import { Trash } from "tabler-icons-react";
import { useEffect, useState } from "react";

interface Props {
  idPedido: number;
}

export const ModificarArticulosMozo = ({ idPedido }: Props) => {
  // const [valor, setValor] = useState<Int>(0)
  const { data: pedidoPorId, isLoading } = usePedido(idPedido);

  const form = useForm<IPedido>({
    initialValues: {
      id_mesa: pedidoPorId?.id_mesa || null,
      id_usuario: pedidoPorId?.id_usuario || null,
      fecha_hora_pedido: pedidoPorId?.fecha_hora_pedido,
      fecha_hora_entrega: null,
      observaciones: pedidoPorId?.observaciones || "",
      estado: pedidoPorId?.estado,
      Detalle_Pedidos: pedidoPorId?.Detalle_Pedidos || [],
    },
    validate: {},
  });
  // const { mutate, error, isLoading } = useMutateCrearPedido();

  useEffect(() => {
    if (pedidoPorId) {
      form.setValues({
        id_mesa: pedidoPorId.id_mesa,
        id_usuario: pedidoPorId.id_usuario,
        fecha_hora_pedido: pedidoPorId.fecha_hora_pedido,
        fecha_hora_entrega: pedidoPorId.fecha_hora_entrega,
        observaciones: pedidoPorId.observaciones,
        estado: pedidoPorId.estado,
        Detalle_Pedidos: pedidoPorId.Detalle_Pedidos,
      });
      // setValor(Number(pedidoPorId.Detalle_Pedidos[0].id_articulo))
    }
  }, [pedidoPorId]);

  const handleSubmit = (values: any) => {
    // const pedido: IPedido = {
    //   id_mesa: parseInt(values.id_mesa),
    //   id_usuario: usuario.id,
    //   fecha_hora_pedido: new Date(),
    //   fecha_hora_entrega: null,
    //   observaciones: values.observaciones,
    //   estado: "PENDIENTE",
    //   Detalle_Pedidos: values.Detalle_Pedidos,
    // };
    // mutate(pedido, {
    //   onSuccess: () => {
    //     console.log(values);
    //   },
    // });
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
            defaultValue={
              pedidoPorId!.Detalle_Pedidos[index].id_articulo as string
            }
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
      {isLoading ? (
        <Box>Cargando...</Box>
      ) : (
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
                type="submit"
                mt="xs"
                sx={{ width: "100%" }}
              >
                Registrar pedido
              </Button>
            </Grid.Col>
          </Grid>

          <Text size="sm" weight={500} mt="md">
            Form values:
          </Text>
          <Code block>{JSON.stringify(form.values, null, 2)}</Code>
        </form>
      )}
    </div>
  );
};
