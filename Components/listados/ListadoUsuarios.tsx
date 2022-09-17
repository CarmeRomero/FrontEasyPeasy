import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ICellRendererParams } from "ag-grid-community";
import { useRouter } from "next/router";
import { Dots, Menu } from "tabler-icons-react";
import { Box, Button } from "@mantine/core";

const btnAcciones = ({ data }: ICellRendererParams) => {
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
      <Menu
        control={
          <Button px={10} my={10} sx={{ height: "30px" }}>
            <Dots strokeWidth={2} size={17} color={"rgba(255,255,255,.8)"} />
          </Button>
        }
        withArrow
      >
        <Menu.Target>
          <Button>Toggle menu</Button>
        </Menu.Target>

        <Menu.Item
          onClick={() => {
            router.push({
              pathname: "/documentos/creacion-documento",
              query: {
                idCaja: data.id,
                idCliente: data.idCliente,
              },
            });
          }}
        >
          Crear documento
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export const ListadoUsuarios = () => {
  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "nombre" },
    { field: "apellido" },
    { field: "rol" },
    { field: "estado" },
    {
      field: "ACCIONES",
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

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever
  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((result) => {
        const data = result.json();
        return data;
      })
      .then((rowData) => setRowData(rowData));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e: any) => {
    if (null !== gridRef.current) {
      // console.log(gridRef);
      gridRef.current.api.deselectAll();
    }
  }, []);

  return (
    <div>
      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div
        className="ag-theme-alpine"
        style={{ width: "100vw", height: 567, padding: 20 }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          paginationPageSize={10} // Optional - Pagination Page Size
          pagination={true} // Optional - Pagination
          paginationAutoPageSize={true} // Optional - Paginationa
        />
      </div>
    </div>
  );
};
