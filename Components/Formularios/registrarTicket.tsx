import {
  Box,
  Button,
  Grid,
  TextInput,
  Group,
  ActionIcon,
  Select,
  NumberInput,
  Text,
  Divider,
  Table,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useArticulos } from "../../hooks/useArticulos";

import { useState, useRef, useEffect, useMemo } from "react";

import { usePedidoMesa } from "../../hooks/usePedidos";
import { useMesas, useUnaMesa } from "../../hooks/useMesas";
import { ITicket } from "../../interfaces/ticket";
import { IPedidoDelTicket } from "../../interfaces/pedidoDelTicket";
import { AlignJustified } from "tabler-icons-react";
import { useMutateTicket } from "../../hooks/useTickets";

export const RegistrarTicket = () => {
  const [numMesa, setNumMesa] = useState(0);
  const { data: pedidoMesa, refetch } = usePedidoMesa(numMesa);
  const [detalle, setDetalle] = useState([]);
  const [precio, setPrecio] = useState(0);
  const { data: articulos } = useArticulos();
  const { data: mesas } = useMesas();
  const [numPedido, setNumPedido] = useState<number>();

  let precioTotal = 0;

  useEffect(() => {
    if (Array.isArray(pedidoMesa)) {
      if (pedidoMesa.length > 0) {
        setDetalle(pedidoMesa[0].Detalle_Pedidos);
        setNumPedido(pedidoMesa[0].num_pedido);
      } else {
        setDetalle([]);
        setNumPedido(0);
      }
      // } else {
      //   setDetalle([]);
      //     form.setValues({
      //       id_pedido: 0,
      //       id_usuario: 0,
      //       id_forma_pago: 0,
      //     });
      //   }
      // } else {
      // setDetalle([]);

      //   form.setValues({
      //     id_pedido: 0,
      //     id_usuario: 0,
      //     id_forma_pago: 0,
      //   });
      // }
    }
  }, [pedidoMesa]);

  detalle
    ? detalle.map((detalle: any) => (precioTotal += parseInt(detalle.precio)))
    : [];

  const { mutate } = useMutateTicket();

  const handleSubmit = () => {
    const ticket: ITicket = {
      id_pedido: pedidoMesa[0].id,
      id_usuario: pedidoMesa[0].id_usuario,
      fecha_hora: new Date(),
      estado_pendiente_pago: true,
      total: precioTotal,
    };

    mutate(ticket, {
      onSuccess: () => {
        console.log(ticket);
      },
    });
  };

  // const notificacion = () => (
  //   <Notification
  //       icon={<Check size={18} />}
  //       color="teal"
  //       title="Teal notification"
  //     >
  //       This is teal notification with icon
  //     </Notification>;
  // )

  const handleChange = (value: any) => {
    setNumMesa(value);
    // form.setFieldValue("id_mesa", value);
  };

  const rows = detalle
    ? detalle.map((detalle: any) => (
        <>
          {console.log(detalle)}
          <tr key={detalle.Articulos.id}>
            <td>{detalle.Articulos.descripcion}</td>
            <td>{detalle.cantidad}</td>
            <td>{detalle.Articulos.precio_venta}</td>
          </tr>
        </>
      ))
    : [];

  return (
    <>
      <Box>
        <Grid>
          <Grid.Col xs={6}>
            <Select
              label="Mesas"
              placeholder="Seleccione un número de mesa"
              id="mesa"
              onChange={handleChange}
              autoComplete="off"
              nothingFound="Sin mesas"
              data={
                mesas
                  ? mesas.map(({ id, num_mesa }: any) => ({
                      label: num_mesa,
                      value: id,
                    }))
                  : []
              }
            />
          </Grid.Col>
          <Grid.Col xs={6}>
            <TextInput
              disabled
              label="Número del pedido:"
              defaultValue={numPedido == 0 ? 0 : numPedido}
            />
          </Grid.Col>
        </Grid>

        <Divider my="xl" />
      </Box>
      <Box>
        <Grid>
          <Grid.Col xs={12}>
            <Table>
              <thead>
                <tr>
                  <th>Artículo </th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Grid.Col>
          <Button
            color="grape"
            radius="lg"
            variant="outline"
            type="submit"
            mt="xs"
            onClick={handleSubmit}
            sx={{
              width: 50,
              display: "flex",
              flex: 1,
              justifyContent: "center",
            }}
          >
            Generar ticket
          </Button>
        </Grid>
      </Box>
    </>

    // <>
    //   <Box>
    // <Text align="center" my="xl">
    //       Seleccione una mesa
    //     </Text>
    //   </Box>

    //   <Tabs color="yellow" tabPadding="xl" grow position="apart">
    //     <Tabs.Tab label="1"></Tabs.Tab>
    //     <Tabs.Tab label="2">Messages tab content</Tabs.Tab>
    //     <Tabs.Tab label="3">Settings tab content</Tabs.Tab>
    //     <Tabs.Tab label="4 "></Tabs.Tab>
    //     <Tabs.Tab label="5">Messages tab content</Tabs.Tab>
    //     <Tabs.Tab label="6">Settings tab content</Tabs.Tab>
    //   </Tabs>
    // </>
  );
};
