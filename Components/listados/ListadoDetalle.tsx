import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Select,
  Switch,
  Menu,
  Table,
  Modal,
  MODAL_SIZES,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { BoxMargin, Dots, Edit, Eye, Id, Trash } from "tabler-icons-react";
import {
  useArticulos,
  useMutateArticulo,
  useUnArticulo,
} from "../../hooks/useArticulos";
import { useCategorias } from "../../hooks/useCategoria";
import { IArticulo } from "../../interfaces/articulo";
import { useState, useRef, useEffect, useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { IDetallePedido } from "../../interfaces/detalle-pedido";
import { PedidoContext } from "../../context/pedido/pedidoContex";
import { useContext } from "react";
import { IPedido } from "../../interfaces/registrarPedido";
import { usePedido } from "../../hooks/usePedidos";
import { prepareServerlessUrl } from "next/dist/server/base-server";

////////////NO SE USA ////////////////////////////////////////////////

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  // id: number;
  detallito: [];
  pedido: IPedido;
}

export const ListadoDetalle = ({
  open,
  setOpen,
  // id,
  detallito,
  pedido,
}: Props) => {
  const [detalle, setDetalle] = useState([]);

  const [open2, setOpen2] = useState(false);

  const pedidoUpdate: IPedido = {
    id_mesa: pedido.id_mesa,
    id_usuario: pedido.id_usuario,
    fecha_hora_pedido: pedido.fecha_hora_pedido,
    fecha_hora_entrega: null,
    observaciones: pedido.observaciones,
    estado: "PENDIENTE",
    Detalle_Pedidos: detalle,
  };
  //   const { data } = usePedido(id);
  //   setPedido(data);
  //   console.log(pedido);
  //   const rows = data
  //     ? data.Detalle_Pedidos.map((detalle: any) => (
  //         <tr key={detalle.id_articulo}>
  //           <td>{detalle.id_articulo}</td>
  //           <td>{detalle.cantidad}</td>
  //           <td>{detalle.precio}</td>
  //         </tr>
  //       ))
  //     : [];

  //   useEffect(() => {
  //     setPedido(data);
  //   }, [data]);

  useEffect(() => {
    setDetalle(detallito);
  }, []);

  console.log(detalle);

  const registrarDetalle = () => {
    // setDetalle(...prev, nuevoDetalle);
    setOpen(false);
    setOpen2(true);
  };
  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Detalle del pedido"
        size={MODAL_SIZES.sm}
      >
        <Table>
          <thead>
            <tr>
              <th>Artículo </th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {detallito.map((detalle: any) => (
              <tr key={detalle.id_articulo}>
                <td>{detalle.id_articulo}</td>
                <td>{detalle.cantidad}</td>
                <td>{detalle.precio}</td>
              </tr>
            ))}
            <Button onClick={registrarDetalle}> Agregar detalle</Button>
          </tbody>
        </Table>
      </Modal>
      {/* <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title=""
        size={MODAL_SIZES.sm}
      >
        <h2>Hola</h2>
      </Modal> */}
    </>
  );
};

const registrarDetalle = ({ data }: ICellRendererParams) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ListadoDetalle
        open={open}
        setOpen={setOpen}
        // id={data.id}
        detallito={data.Detalle_Pedidos}
        pedido={data}
      />
      {/* ABRIR MODAL */}

      <Menu
        placement="end"
        control={
          <Button
            variant="filled"
            color="yellow"
            px={10}
            my={10}
            sx={{ height: "30px" }}
          ></Button>
        }
        withArrow
      >
        <Menu.Item
          icon={<Edit size={14} />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Ver detalle
        </Menu.Item>
      </Menu>
    </Box>
  );
};
