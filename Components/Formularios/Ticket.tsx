import {
  Text,
  Divider,
  Box,
  Title,
  Grid,
  Button,
  Group,
  Modal,
  Table,
  MODAL_SIZES,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useUnTicket } from "../../hooks/useTickets";
import { ITicketDetalle } from "../../interfaces/ticket-detalle";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export const Ticket = ({ open, setOpen, id }: Props) => {
  const [ticket, setTicket] = useState<ITicketDetalle | any>(null);
  const [fecha, setFecha] = useState(Date);

  const { data: obtenerTicket } = useUnTicket(id);

  useEffect(() => {
    if (obtenerTicket) {
      setTicket(obtenerTicket);
    }
  }, [obtenerTicket]);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const tablaDesc = ticket?.Pedido.Detalle_Pedidos.map((detalle: any) => {
    return (
      <>
        <tr key={detalle.Articulos.id}>
          <td>{detalle.Articulos.descripcion}</td>
          <td>{detalle.cantidad}</td>
          <td style={{ textAlign: "right" }}>
            {detalle.Articulos.precio_venta}
          </td>
        </tr>
      </>
    );
  });

  console.log(ticket);

  // const tickets = ticket?.map((item: any) => ({
  //   ...item,
  //   fecha_hora: moment(item?.fecha_hora).format("DD-MM-YYYY - h:mm:ss a"),
  // }));

  return (
    <Modal opened={open} onClose={() => setOpen(false)} size={MODAL_SIZES.md}>
      <Box ref={componentRef}>
        <Grid>
          <Grid.Col md={12}>
            <Title order={3} align="center">
              Ticket
            </Title>
          </Grid.Col>
          <Grid.Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Descripcion </th>
                  <th>Cantidad</th>
                  <th style={{ textAlign: "right" }}>Precio</th>
                </tr>
              </thead>
              <tbody>{tablaDesc}</tbody>
            </Table>
            <Divider />
            <Group position="apart" px={10}>
              <Text>Total:</Text>
              <Text>{ticket && ticket.total}</Text>
            </Group>
            <br />
            <Divider variant="dashed" />
            <Group position="center" px={10}>
              <Text>Fecha: </Text>
              <Text>
                {ticket &&
                  moment(ticket.fecha_hora).format("DD-MM-YYYY - h:mm:ss a")}
              </Text>
            </Group>
            <Group position="center" px={10}>
              <Text>Mozo: </Text>
              <Text>{ticket && ticket.Usuarios.nombre}</Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>

      <Group position="right">
        <Button onClick={handlePrint} my={10} sx={{ display: "flex" }}>
          Imprimir
        </Button>
      </Group>
    </Modal>
  );
};
