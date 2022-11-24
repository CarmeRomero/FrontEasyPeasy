import { useArticulos } from "../../hooks/useArticulos";
import {
  Box,
  Button,
  // Select,
  Card,
  Textarea,
  // Grid,
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
  CirclePlus,
  CircleX,
  DentalBroken,
  Trash,
} from "tabler-icons-react";
import { useEffect, useState, useRef } from "react";
import { IModificarPedido } from "../../interfaces/modificar-pedido";
import { useMesas } from "../../hooks/useMesas";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Table,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  idPedido: number;
}

export const ModificarPedido = ({ idPedido }: Props) => {
  // const [articulosHard, setArticulosHard] = useState([]);

  console.log(idPedido);
  const { data: articulos } = useArticulos();
  const [value, setValue] = useState("23");

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
      activo: true,
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
        activo: pedidoPorId.activo,
        Detalle_Pedidos: pedidoPorId.Detalle_Pedidos,
      });
      console.log(pedidoPorId);
    }
  }, [pedidoPorId]);

  useEffect(() => {
    if (articulos) {
      form.setValues(articulos);
    }
    console.log(articulos);
  }, []);

  // const { mutate } = useMutateModificarPedido();
  const handleSubmit = (values: any) => {
    active == 1
      ? (values.estado = "PENDIENTE") && (values.activo = true)
      : active == 2
      ? (values.estado = "ENTREGADO") &&
        (values.fecha_hora_entrega = new Date()) &&
        (values.activo = true)
      : active == 3
      ? (values.estado = "CANCELADO") && (values.activo = false)
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
      activo: values.activo,
      Detalle_Pedidos: values.Detalle_Pedidos,
    };

    // mutate(pedido, {
    //   onSuccess: () => {
    //     console.log(values);
    //   },
    // });
    actualizarPedido(idPedido, pedido);
  };

  const handleChangeArticulo = async (e: any, item: any, index: any) => {
    setValue(e.target.value);
    form.setFieldValue(`Detalle_Pedidos.${index}.id_articulo`, e.target.value);
    const articulo = articulos.find((x: any) => x.id == e.target.value);
    form.setFieldValue(
      `Detalle_Pedidos.${index}.precio`,
      articulo.precio_venta
    );
  };

  console.log(form.values.Detalle_Pedidos);
  // const handleChangeArticulo = async (e: any, item: any, index: any) => {
  //   console.log(index);
  //   console.log(e);
  //   console.log(item);
  // };

  const handleChangeMesa = (e: any) => {
    form.setFieldValue(`id_mesa`, e.target.value);
    console.log(e.target.value);
  };

  const [arrayArt, setArrayArt] = useState([]);
  // console.log(form.values.Detalle_Pedidos.length);
  // console.log(pedidoPorId?.Detalle_Pedidos.length);
  const fields = form.values.Detalle_Pedidos.map((item, index) => (
    <Group key={index} mt="xs">
      <Grid>
        {/* <Grid.Col xs={7} md={8}> */}
        {/* <select
            value={value}
            // label="Seleccione un artículo"
            // placeholder="Seleccione una"
            id="articulo"
            onChange={(e) => handleChangeArticulo( index)}
            autoComplete="off"
            // {...form.getInputProps(`Detalle_Pedidos.${index}.cantidad`)}
            // maxDropdownHeight={230}
            // nothingFound="No hay artículos"
            
            data={
              articulos
                ? articulos.map(({ id, descripcion }: any) => ({
                    label: descripcion,
                    value: id,
                  }))
                : []
            }
          /> */}

        <FormControl fullWidth>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Select
                labelId="demo-simple-select-label"
                id={index.toString()}
                value={form.values.Detalle_Pedidos[index].id_articulo}
                // label="Artículo"
                onChange={(e) => handleChangeArticulo(e, item, index)}
                sx={{ width: "200px" }}
              >
                {articulos
                  ? articulos.map(({ id, descripcion }: any) => (
                      <MenuItem value={id}>{descripcion}</MenuItem>
                    ))
                  : null}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                {...form.getInputProps(`Detalle_Pedidos.${index}.cantidad`)}
              />
              {/* <NumberInput
                label="Cantidad"
                hideControls
                
              /> */}
            </Grid>
            <Grid item xs={3}>
              <ActionIcon
                mt="md"
                mx={10}
                variant="outline"
                radius="lg"
                color="red"
                onClick={() => form.removeListItem("Detalle_Pedidos", index)}
              >
                <Trash size={18} />
              </ActionIcon>
            </Grid>
          </Grid>
        </FormControl>
        {/* </Grid.Col> */}

        {/* <Grid.Col xs={3} md={2}></Grid.Col>
        <Grid.Col xs={2} md={2}> */}

        {/* </Grid.Col> */}
      </Grid>
    </Group>
  ));

  const [active, setActive] = useState(1);
  const entregado = () => {
    setActive((current) => (current < 2 ? (current = 2) : current));
  };
  const cancelado = () => {
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
            {/* <Grid.Col md={12}> */}
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
            {/* </Grid.Col> */}
          </Grid>
          {/* ////SEPARADOR///// */}
          <Grid>
            {/* <Grid.Col md={12}> */}
            <Text weight={500} size="sm" my={3}>
              Seleccione el articulo
            </Text>
            <Card p="lg" radius="md" withBorder>
              <Box>
                <Box sx={{ maxWidth: 500 }} mx="auto">
                  {/* {fields.length > 0 ? (
                      <Box></Box>
                    ) : (
                      <Text color="dimmed" align="center">
                        No hay ningún artículo
                      </Text>
                    )} */}

                  {fields}

                  <Group position="center" mt="md">
                    <Button
                      leftIcon={
                        <CirclePlus size={30} strokeWidth={2} color={"white"} />
                      }
                      mt={20}
                      color="teal"
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
            {/* </Grid.Col> */}
            {/* <Grid.Col md={12}> */}
            {/* <Select
                label="Seleccione el número de mesa"
                placeholder="Seleccione una"
                id="mesas"
                onChange={handleChangeMesa}
                autoComplete="off"
                // maxDropdownHeight={230}
                nothingFound="No hay mesas"
                data={
                  mesas
                    ? mesas.map(({ id, num_mesa }: any) => ({
                        label: num_mesa,
                        value: id,
                      }))
                    : []
                }
              /> */}
            <InputLabel
              sx={{
                paddingTop: "20px",
                marginBottom: "0px",
                fontSize: "0.9em",
              }}
            >
              Número de mesa
            </InputLabel>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                label="Número de mesa"
                // value={form.values.id_mesa}
                value={form.values.id_mesa}
                onChange={(e) => handleChangeMesa(e)}
                sx={{ width: "100%", marginTop: "30px" }}
              >
                {mesas
                  ? mesas.map(({ id, num_mesa }: any) => (
                      <MenuItem value={id}>{num_mesa}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <Textarea
              placeholder="Observaciones"
              label="Observaciones"
              radius="md"
              my="xs"
              {...form.getInputProps("observaciones")}
            />
            <Button
              color="red"
              radius="lg"
              variant="outline"
              type="submit"
              mt="xs"
              sx={{ width: "100%" }}
            >
              Guardar cambios
            </Button>
            {/* </Grid.Col> */}
          </Grid>
          {/* <Button onClick={handleClick}>Algo</Button> */}
          {/* <Text size="sm" weight={500} mt="md">
            Form values:
          </Text> */}
          {/* <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
        </form>
      )}
    </div>
  );
};
