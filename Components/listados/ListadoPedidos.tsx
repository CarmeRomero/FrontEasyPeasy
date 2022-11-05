import { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ICellRendererParams } from "ag-grid-community";
import { Badge, Box, Button, Menu } from "@mantine/core";
import { Dots, Edit, Eye, Trash } from "tabler-icons-react";
import { useCategorias } from "../../hooks/useCategoria";
import { IArticulo } from "../../interfaces/articulo";
import { FormularioActualizarArticulo } from "../Formularios/actualizarArticulo";
import {
  useMutateAnularPedido,
  usePedido,
  usePedidosDelUsuario,
} from "../../hooks/usePedidos";
import { ListadoDetalle } from "./ListadoDetalle";
import { useRouter } from "next/router";

const btnAcciones = ({ data }: ICellRendererParams) => {
  const [open, setOpen] = useState(false);
  //   const { mutate, isLoading, error } = useMutateAnularArticulo();

  // const { refetch } = useArticulos();

  //ELIMINAR ARTICULO
  //   const handleDelete = (value: any) => {
  //     mutate(value, {
  //       onSuccess: () => {
  //         refetch();
  //       },
  //     });
  //   };

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
      {/* 
      <FormularioActualizarArticulo
        open={open}
        setOpen={setOpen}
        id={data.id}
      /> */}

      {/* <Menu
        placement="end"
        control={
          <Button
            variant="filled"
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
          Editar Pedido
        </Menu.Item>
        <Menu.Item
          icon={<Trash size={14} />}
          onClick={() => {
            // handleDelete(data.id);
          }}
        >
          Eliminar
        </Menu.Item>
      </Menu> */}
    </Box>
  );
};

const btnVerDetalle = ({ data }: ICellRendererParams) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutate, isLoading, error } = useMutateAnularPedido();

  const { refetch } = usePedidosDelUsuario();
  //ELIMINAR ARTICULO
  const handleDelete = (value: any) => {
    mutate(value, {
      onSuccess: () => {
        refetch();
      },
    });
  };

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
          >
            <Dots strokeWidth={2} size={17} />
          </Button>
        }
        withArrow
      >
        <Menu.Item
          icon={<Edit size={14} />}
          onClick={() => {
            router.push({
              pathname: "/pedidos/modificar-pedido",
              query: {
                idPedido: data.id,
              },
            });
          }}
        >
          Editar
        </Menu.Item>
        <Menu.Item
          icon={<Trash size={14} />}
          onClick={() => {
            handleDelete(data.id);
          }}
        >
          Eliminar
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export const ListadoPedidos = () => {
  const gridRef = useRef<any>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "N° de mesa",
      field: "Mesas.num_mesa",
      width: 70,
      resizable: true,
    },
    { headerName: "N° de pedido", field: "num_pedido", width: 150 },
    {
      headerName: "Estado",
      field: "estado",
    },
    {
      headerName: "Hora del pedido",
      field: "fecha_hora_pedido",
      width: 150,
    },
    {
      headerName: "Hora de entrega",
      field: "fecha_hora_entrega",
      width: 150,
    },
    {
      headerName: "Estado mesa",
      field: "Mesas.estado",
    },
    {
      headerName: "Acciones",
      field: "Acciones",
      pinned: "right",
      resizable: false,
      width: 90,
      filter: false,
      cellRenderer: btnVerDetalle,
    },

    // {
    //   headerName: "ACCIONES",
    //   field: "ACCIONES",
    //   pinned: "right",
    //   resizable: false,
    //   width: 100,
    //   filter: false,
    //   cellRenderer: btnAcciones,
    // },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      floatingFilter: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      width: 100,
      resizable: true,
    }),
    []
  );

  const { data, refetch } = usePedidosDelUsuario();

  useEffect(() => {
    setRowData(data);
    refetch();
  }, [data]);

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{
          width: "75vw",
          height: 500,
          padding: 10,
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
