import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ICellRendererParams } from "ag-grid-community";
import { useRouter } from "next/router";
import { Badge, Box, Button, Menu, Text } from "@mantine/core";
import { Check, Dots, Edit, Trash, X } from "tabler-icons-react";
import { useMutateAnularUsuario, useUsuarios } from "../../hooks/useUsuario";
import { SeleccionarRol } from "../Formularios/SeleccionarRol";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

const btnAcciones = ({ data }: ICellRendererParams) => {
  const modals = useModals();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading, error } = useMutateAnularUsuario();

  const { refetch } = useUsuarios();

  const openDeleteModal = (value: any) =>
    modals.openConfirmModal({
      title: "¿Está seguro que quiere eliminar este usuario?",
      centered: true,

      labels: { confirm: "Eliminar cuenta", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => {
        showNotification({
          color: "red",
          icon: <X />,
          title: "No se eliminó el usuario",
          message: "",
          autoClose: 2000,
        });
      },
      onConfirm: () => {
        mutate(value, {
          onSuccess: () => {
            showNotification({
              color: "green",
              icon: <Check />,
              title: "Usuario eliminado",
              message: "",
            });
            refetch();
          },
        });
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
      <SeleccionarRol open={open} setOpen={setOpen} id={data.id} />

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
          Editar rol
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

export const ListadoUsuarios = () => {
  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "nombre", minWidth: 150 },
    { field: "apellido", minWidth: 150 },
    { field: "email", minWidth: 150 },
    { field: "rol", cellRenderer: btnRol },
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

  const { data } = useUsuarios();

  useEffect(() => {
    setRowData(data);
  }, [data]);

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{
          width: "70vw",
          height: 550,
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
