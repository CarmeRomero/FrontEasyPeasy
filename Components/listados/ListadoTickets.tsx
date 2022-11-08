import { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ICellRendererParams } from "ag-grid-community";
import { Box, Button, Menu } from "@mantine/core";
import { Dots, Edit, FileInvoice, Trash } from "tabler-icons-react";
import {
  useArticulos,
  useMutateAnularArticulo,
} from "../../hooks/useArticulos";
import { FormularioActualizarArticulo } from "../Formularios/actualizarArticulo";
import { useTickets } from "../../hooks/useTickets";
import { Ticket } from "../Formularios/Ticket";
import { FormularioCobro } from "../Formularios/registrarCobro";

const btnAcciones = ({ data }: ICellRendererParams) => {
  const [open, setOpen] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);

  console.log(data);
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
      {/* ABRIR MODAL */}

      <FormularioCobro
        open={open}
        setOpen={setOpen}
        id={data.id}
        mesa={data.Pedido.Mesas.num_mesa}
        idMesa={data.Pedido.Mesas.id}
      />
      {openTicket && (
        <Ticket open={openTicket} setOpen={setOpenTicket} id={data.id} />
      )}

      <Button
        variant="filled"
        color="grape"
        px={10}
        my={10}
        sx={{ height: "30px" }}
        onClick={() => {
          setOpenTicket(true);
        }}
      >
        <FileInvoice size={14} />
      </Button>

      <Button
        variant="filled"
        color="red"
        mx={5}
        px={10}
        my={10}
        sx={{ height: "30px" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Cobrar
      </Button>
    </Box>
  );
};

export const ListadoTickets = () => {
  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const { data } = useTickets();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Ticket", field: "num_ticket", minWidth: 100 },
    {
      headerName: "Mesa",
      field: "Pedido.Mesas.num_mesa",
      minWidth: 100,
    },
    {
      headerName: "Fecha y hora",
      field: "fecha_hora",
      minWidth: 100,
      resizable: true,
    },

    {
      headerName: "Forma de pago",
      field: "formas_pago.descripcion",
      minWidth: 100,
    },
    {
      headerName: "ACCIONES",
      field: "ACCIONES",
      pinned: "right",
      resizable: false,
      width: 150,
      filter: false,
      cellRenderer: btnAcciones,
    },
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

  useEffect(() => {
    setRowData(data);

    // const fecha = data.fecha_hora.split("T");
  }, [data]);

  return (
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
  );
};
