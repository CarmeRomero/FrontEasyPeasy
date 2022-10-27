import {
  Box,
  Button,
  Grid,
  TextInput,
  Group,
  ActionIcon,
  Select,
  NumberInput,
  Table,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useArticulos } from "../../hooks/useArticulos";

import { useState, useRef, useEffect, useMemo } from "react";

import { usePedidoMesa } from "../../hooks/usePedidos";
import { useMesas, useUnaMesa } from "../../hooks/useMesas";
import { ITicket } from "../../interfaces/ticket";
import { IPedidoDelTicket } from "../../interfaces/pedidoDelTicket";
import { AgGridReact } from "ag-grid-react";

export const RegistrarTicket = () => {
  const [numMesa, setNumMesa] = useState(0);
  const [detalle, setDetalle] = useState([]);
  const [precio, setPrecio] = useState(0);

  const { data: articulos } = useArticulos();
  const { data: mesas } = useMesas();

  const form = useForm<ITicket>({
    initialValues: {
      id_pedido: null,
      id_usuario: null,
      id_forma_pago: 1,
      num_ticket: 1515,
      estado_pendiente_pago: true,
      total: 500,
    },
    validate: {},
  });

  const { data: pedidoMesa, refetch } = usePedidoMesa(numMesa);

  useEffect(() => {
    if (Array.isArray(pedidoMesa)) {
      if (pedidoMesa.length > 0) {
        setDetalle(pedidoMesa[0].Detalle_Pedidos);

        form.setValues({
          id_pedido: pedidoMesa[0].id,
          id_usuario: pedidoMesa[0].id_usuario,
          id_forma_pago: 1,
        });
        console.log(pedidoMesa[0].Detalle_Pedidos[0].precio);

        let a;
      } else {
        form.setValues({
          id_pedido: 0,
          id_usuario: 0,
          id_forma_pago: 0,
        });
        setDetalle([]);
      }
    } else {
      form.setValues({
        id_pedido: 0,
        id_usuario: 0,
        id_forma_pago: 0,
      });
    }
  }, [pedidoMesa]);

  const handleSubmit = (values: any) => {
    // console.log(values);
  };
  const handleChange = (value: any) => {
    form.setFieldValue("id_mesa", value);
    setNumMesa(value);

    detalle
      ? detalle.map((detalle: any) =>
          setPrecio(precio + parseInt(detalle.precio))
        )
      : [];
    console.log(precio);
  };

  const rows = detalle
    ? detalle.map((detalle: any) => (
        <tr key={detalle.id_articulo}>
          <td>{detalle.id_articulo}</td>
          <td>{detalle.cantidad}</td>
          <td>{detalle.precio}</td>
        </tr>
      ))
    : [];

  return (
    <>
      <Box>
        <Grid>
          <Grid.Col xs={12}>
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
        </Grid>
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
          <form onSubmit={form.onSubmit(handleSubmit)}>
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
          </form>
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
