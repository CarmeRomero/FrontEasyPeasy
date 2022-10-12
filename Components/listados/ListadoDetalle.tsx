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

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export const ListadoDetalle = ({ open, setOpen, id }: Props) => {
  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Codigo", field: "codigo", minWidth: 150 },
    { headerName: "Descripción", field: "descripcion", minWidth: 150 },
    {
      headerName: "Precio de venta",
      field: "precio_venta",
      minWidth: 150,
    },
    { headerName: "Categoría", field: "Categorias.descripcion", minWidth: 150 },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      floatingFilter: true,
    }),
    []
  );

  const { data } = useArticulos();

  useEffect(() => {
    setRowData(data);
  }, [data]);

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Agregar una categoría"
      size={MODAL_SIZES.sm}
    >
      <div>
        <div
          className="ag-theme-alpine"
          style={{
            width: "70vw",
            height: 567,
            padding: 20,
          }}
        >
          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            paginationPageSize={10} // Optional - Pagination Page Size
            pagination={true} // Optional - Pagination
            paginationAutoPageSize={true} // Optional - Paginationa
          />
        </div>
      </div>
    </Modal>
  );
};
