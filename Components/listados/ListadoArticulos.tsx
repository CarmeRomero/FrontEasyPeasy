import { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ICellRendererParams } from "ag-grid-community";
import { useRouter } from "next/router";
import { Badge, Box, Button, Menu } from "@mantine/core";
import { Dots, Edit, Trash } from "tabler-icons-react";
import { useMutateAnularUsuario } from "../../hooks/useUsuario";
import { useArticulos } from "../../hooks/useArticulos";

const btnAcciones = ({ data }: ICellRendererParams) => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading, error } = useMutateAnularUsuario();

  const { refetch } = useArticulos();

  //ELIMINAR ARTICULO
  // const handleDelete = (value: any) => {
  //   mutate(value, {
  //     onSuccess: () => {
  //       refetch();
  //     },
  //   });
  // };

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
      {/* <SeleccionarRol open={open} setOpen={setOpen} id={data.id} /> */}

      <Menu
        placement="end"
        control={
          <Button
            variant="light"
            color="grape"
            px={10}
            my={10}
            sx={{ height: "30px" }}
          >
            <Dots strokeWidth={2} size={17} />
          </Button>
        }
        withArrow
      >
        <Menu.Item
          icon={<Edit size={14} />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Editar rol
        </Menu.Item>
        <Menu.Item
          icon={<Trash size={14} />}
          onClick={() => {
            // handleDelete(data.id);
          }}
        >
          Eliminar
        </Menu.Item>
      </Menu>
    </Box>
  );
};

const btnRol = ({ data }: ICellRendererParams) => {
  const router = useRouter();

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
      <Badge
        variant="outline"
        color={
          data.rol == "ADMIN"
            ? "red"
            : data.rol == "VISITANTE"
            ? "blue"
            : data.rol == "MOZO"
            ? "green"
            : "orange"
        }
      >
        {data.rol}
      </Badge>
    </Box>
  );
};

export const ListadoArticulos = () => {
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
    { headerName: "Categoría", field: "categoria", minWidth: 150 },
    {
      headerName: "ACCIONES",
      pinned: "right",
      resizable: false,
      width: 100,
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

  const { data } = useArticulos();

  useEffect(() => {
    setRowData(data);
    console.log(data);
  }, [data]);

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{
          width: "90vw",
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
