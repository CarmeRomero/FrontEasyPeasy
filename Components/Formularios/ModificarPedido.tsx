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
  Stepper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IPedido } from "../../interfaces/registrarPedido";
import { actualizarPedido, usePedido } from "../../hooks/usePedidos";
import {
  Check,
  CircleCheck,
  CircleX,
  DentalBroken,
  Trash,
} from "tabler-icons-react";
import { useEffect, useState } from "react";
import { IModificarPedido } from "../../interfaces/modificar-pedido";
import { useMesas } from "../../hooks/useMesas";

interface Props {
  idPedido: number;
}

export const ModificarPedido = ({ idPedido }: Props) => {
  // const [articulosHard, setArticulosHard] = useState([]);

  const { data: articulos } = useArticulos();

  const { data: pedidoPorId, isLoading } = usePedido(idPedido);
  const { data: mesas } = useMesas();

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
    }
  }, [pedidoPorId]);

  useEffect(() => {
    if (articulos) {
      form.setValues(articulos);
    }
  }, []);

  // const { mutate } = useMutateModificarPedido();
  const handleSubmit = (values: any) => {
    active == 1
      ? (values.estado = "PENDIENTE")
      : active == 2
      ? (values.estado = "ENTREGADO") &&
        (values.fecha_hora_entrega = new Date())
      : active == 3
      ? (values.estado = "CANCELADO")
      : "";

    const detalle_pedido = values.Detalle_Pedidos.map((detalle: any) => {
      delete detalle.id_pedido;
      return detalle;
    });
    console.log(detalle_pedido);
    const pedido: IModificarPedido = {
      id_mesa: parseInt(values.id_mesa),
      fecha_hora_pedido: values.fecha_hora_pedido,
      fecha_hora_entrega: values.fecha_hora_entrega,
      observaciones: values.observaciones,
      estado: values.estado,
      Detalle_Pedidos: values.Detalle_Pedidos,
    };

    // mutate(pedido, {
    //   onSuccess: () => {
    //     console.log(values);
    //   },
    // });
    actualizarPedido(idPedido, pedido);
  };

  const handleChangeArticulo = async (event: any, index: any) => {
    // console.log(prop);
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
            // value={valor}
            // {...form.getInputProps(`Detalle_Pedidos.${index}.cantidad`)}
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

  const [active, setActive] = useState(1);
  const entregado = () => {
    // setActive((current) => (current < 2 ? current + 1 : current));
    setActive((current) => (current < 2 ? (current = 2) : current));
  };
  const cancelado = () => {
    // setActive((current) => (current < 2 ? current + 2 : current));
    setActive((current) => (current < 2 ? (current = 3) : current));
  };

  // const volverAtras = () =>
  //   setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div>
      {isLoading ? (
        <Box>Cargando...</Box>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col md={12}>
              <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                iconSize={37}
              >
                <Stepper.Step
                  label="PENDIENTE"
                  description="El pedido está siendo preparado"
                  completedIcon={<Check />}
                  allowStepSelect={active > 0}
                  value="PENDIENTE"
                ></Stepper.Step>
                <Stepper.Step
                  label="ENTREGADO"
                  name="ENTREGADO"
                  color={active == 2 ? "blue" : active == 3 ? "red" : "blue"}
                  completedIcon={active == 3 ? <CircleX /> : <Check />}
                  description="El pedido ya fue entregado"
                  allowStepSelect={active > 1}
                  state="stepInactive"
                  {...form.getInputProps("estado")}
                ></Stepper.Step>
                <Stepper.Step
                  label="CANCELADO"
                  description="Se canceló el pedido"
                  color="red"
                  name="CANCELADO"
                  // state={active == 2 ? "stepInactive" : "stepProgress"}
                  completedIcon={<CircleX />}
                  // {...form.setFieldValue("estado")}

                  // allowStepSelect={active == 0 ? true : false}
                ></Stepper.Step>
                {/* 
                <Stepper.Completed>
                  Completed, click back button to get to previous step
                </Stepper.Completed> */}
              </Stepper>

              <Group position="center" mt="xl">
                <Button radius="xl" color="teal" mt="xl" onClick={entregado}>
                  Entregado
                </Button>
                <Button radius="xl" color="red" mt="xl" onClick={cancelado}>
                  Cancelar pedido
                </Button>
                {/* <Button radius="xl" color="red" onClick={volverAtras}>
                  volver
                </Button> */}
              </Group>
            </Grid.Col>
          </Grid>
          {/* ////SEPARADOR///// */}
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
                            // id_pedido: null,
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
                label="Seleccione el número de mesa"
                placeholder="Seleccione una"
                id="mesas"
                onChange={handleChangeMesa}
                // searchable
                autoComplete="off"
                maxDropdownHeight={230}
                nothingFound="No hay mesas"
                data={
                  mesas
                    ? mesas.map(({ id, num_mesa }: any) => ({
                        label: num_mesa,
                        value: id,
                      }))
                    : []
                }
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
                Guardar cambios
              </Button>
            </Grid.Col>
          </Grid>
          {/* <Button onClick={handleClick}>Algo</Button> */}
          <Text size="sm" weight={500} mt="md">
            Form values:
          </Text>
          <Code block>{JSON.stringify(form.values, null, 2)}</Code>
        </form>
      )}
    </div>
  );
};
