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
import { BoxMargin, Dots, Edit, Id, Trash } from "tabler-icons-react";
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

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export const ListadoDetalle = ({ open, setOpen, id }: Props) => {
  //   const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  const { data } = usePedido(id);
  const rows = data
    ? data.Detalle_Pedidos.map((detalle: any) => (
        <tr key={detalle.id_articulo}>
          <td>{detalle.id_articulo}</td>
          <td>{detalle.cantidad}</td>
          <td>{detalle.precio}</td>
        </tr>
      ))
    : [];

  useEffect(() => {}, [data]);

  return (
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
        <tbody>{rows}</tbody>
      </Table>
    </Modal>
  );
};
