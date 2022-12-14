import { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ICellRendererParams } from "ag-grid-community";
import { useRouter } from "next/router";
import { Badge, Box, Button, Menu } from "@mantine/core";
import { Check, Dots, Edit, Trash, X } from "tabler-icons-react";
import {
  useArticulos,
  useMutateAnularArticulo,
} from "../../hooks/useArticulos";
import { useCategorias } from "../../hooks/useCategoria";
import { IArticulo } from "../../interfaces/articulo";
import { FormularioActualizarArticulo } from "../Formularios/actualizarArticulo";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";

const btnAcciones = ({ data }: ICellRendererParams) => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading, error } = useMutateAnularArticulo();
  const modals = useModals();
  const { refetch } = useArticulos();

  //ELIMINAR ARTICULO

  const openDeleteModal = (value: any) =>
    modals.openConfirmModal({
      title: "¿Está seguro que quiere eliminar este artículo?",
      centered: true,
      labels: { confirm: "Eliminar artículo", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "No se eliminó el artículo",
          message: "",
          autoClose: 2000,
        });
        refetch();
      },
      onConfirm: () => {
        mutate(value, {
          onSuccess: () => {
            showNotification({
              color: "green",
              icon: <Check />,
              title: "Artículo eliminado",
              message: "",
            });
          },
        });
        refetch();
      },
    });

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

      <FormularioActualizarArticulo
        open={open}
        setOpen={setOpen}
        id={data.id}
      />

      <Menu
        placement="end"
        control={
          <Button
            variant="filled"
            color="yellow"
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
          Editar artículo
        </Menu.Item>
        <Menu.Item
          icon={<Trash size={14} />}
          onClick={() => {
            openDeleteModal(data.id);
          }}
          color="red"
        >
          Eliminar
        </Menu.Item>
      </Menu>
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
    { headerName: "Categoría", field: "Categorias.descripcion", minWidth: 150 },
    {
      headerName: "ACCIONES",
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

  const { data, refetch } = useArticulos();

  useEffect(() => {
    setRowData(data);
    refetch();
    console.log(data);
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
