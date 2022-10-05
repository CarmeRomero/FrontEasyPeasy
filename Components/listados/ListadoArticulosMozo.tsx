import { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import { useArticulos } from "../../hooks/useArticulos";
import { SimpleGrid } from "@mantine/core";

export const ListadoArticulosMozo = () => {
  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Descripción", field: "descripcion", minWidth: 100 },
    {
      headerName: "Precio de venta",
      field: "precio_venta",
      minWidth: 100,
    },
    { headerName: "Categoría", field: "Categorias.descripcion", minWidth: 100 },
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
    <div>
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 2, spacing: "sm" },
        ]}
        my="md"
      >
        <div
          className="ag-theme-alpine"
          style={{
            width: "35vw",
            height: 400,
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
        <div
          className="ag-theme-alpine"
          style={{
            width: "35vw",
            height: 400,
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
      </SimpleGrid>
    </div>
  );
};
