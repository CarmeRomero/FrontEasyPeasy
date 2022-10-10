import { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import { useArticulos } from "../../hooks/useArticulos";
import { Box, Button, Select, SimpleGrid, Card, Textarea } from "@mantine/core";
import { ICellRendererParams } from "ag-grid-community";
import { CirclePlus } from "tabler-icons-react";
import { FormularioAgregarArticuloPedido } from "../Formularios/agregarArticuloPedido";
import { PedidoContext } from "../../context/pedido/pedidoContex";
import { useContext } from "react";
import { useForm } from "@mantine/form";
import { IPedido } from "../../interfaces/registrarPedido";
import { useMutateCrearPedido } from "../../hooks/usePedidos";

const btnAcciones = ({ data }: ICellRendererParams) => {
  const [open, setOpen] = useState(false);

  const { refetch } = useArticulos();

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

      <FormularioAgregarArticuloPedido
        open={open}
        setOpen={setOpen}
        data={data}
      />

      <Button
        variant="light"
        color="grape"
        px={10}
        my={10}
        sx={{ height: "30px" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <CirclePlus strokeWidth={2} size={17} />
      </Button>
    </Box>
  );
};

export const ListadoArticulosMozo = () => {
  const gridRef = useRef<any>(null);
  const [rowData, setRowData] = useState();
  const { agregarContenido, detalle } = useContext(PedidoContext);

  const form = useForm<IPedido>({
    initialValues: {
      id_mesa: null,
      id_usuario: 7,
      fecha_hora_pedido: null,
      num_pedido: null,
      fecha_hora_entrega: null,
      observaciones: "",
      estado: "",
      Detalle_Pedidos: [],
    },
    validate: {},
  });
  const { mutate, error, isLoading } = useMutateCrearPedido();

  const handleSubmit = (values: any) => {
    const pedido: IPedido = {
      id_mesa: parseInt(values.id_mesa),
      id_usuario: 7,
      fecha_hora_pedido: new Date(),
      num_pedido: 1,
      fecha_hora_entrega: null,
      observaciones: values.observaciones,
      estado: "PENDIENTE",
      Detalle_Pedidos: detalle,
    };
    console.log(detalle);

    mutate(pedido, {
      onSuccess: () => {
        console.log(values);
      },
    });
  };
  const handleChange = (value: any) => {
    form.setFieldValue("id_mesa", value);
  };

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Descripción",
      field: "descripcion",
      minWidth: 150,
      checkboxSelection: true,
    },
    {
      headerName: "Precio de venta",
      field: "precio_venta",
      minWidth: 100,
    },
    { headerName: "Categoría", field: "Categorias.descripcion", minWidth: 100 },
    {
      headerName: "Acciones",
      field: "ACCIONES",
      pinned: "right",
      resizable: false,
      width: 50,
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
  }, [data]);

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Seleccione una mesa"
          placeholder="Seleccione una"
          id="mesas"
          onChange={handleChange}
          // searchable
          autoComplete="off"
          maxDropdownHeight={230}
          nothingFound="No hay mesas"
          data={[
            { value: "1", label: "Mesa 1" },
            { value: "2", label: "Mesa 2" },
            { value: "3", label: "Mesa 3" },
          ]}
        />
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 2, spacing: "sm" },
          ]}
          my="md"
        >
          <div
            className="ag-theme-alpine"
            style={{
              width: "70vw",
              height: 400,
              padding: 20,
              maxWidth: "40vw",
            }}
          >
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection="single" // Options - allows click selection of rows
              paginationPageSize={10} // Optional - Pagination Page Size
              pagination={true} // Optional - Pagination
              paginationAutoPageSize={true} // Optional - Paginationa
            />
          </div>
          <div
            className="ag-theme-alpine"
            style={{
              width: "50vw",
              height: 400,
              padding: 20,
              maxWidth: "30vw",
              marginLeft: "80px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ flex: 1 }}>
                <Card
                  sx={{
                    border: "1px solid #dee2e6",
                    boxShadow:
                      "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
                  }}
                >
                  {detalle.length > 0 ? (
                    detalle.map((item, index) => {
                      return (
                        <Box key={index}>
                          <Box>{`id_articulo: ${item.id_articulo}`}</Box>
                          <Box>{`cantidad: ${item.cantidad}`}</Box>
                          <Box>{`precio: ${item.precio}`}</Box>
                        </Box>
                      );
                    })
                  ) : (
                    <Box>No hay detalles</Box>
                  )}
                </Card>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }} mt={10}>
              <Button variant="outline" color="grape" type="submit" fullWidth>
                Registrar pedido
              </Button>
            </Box>
          </div>
        </SimpleGrid>
        <Box
          sx={{ display: "flex", justifyContent: "begin", minWidth: "" }}
          mt={0}
        >
          <Textarea
            placeholder="Observaciones"
            label="Observaciones"
            radius="md"
            {...form.getInputProps("observaciones")}
            mb="xs"
          />
        </Box>
      </form>
    </div>
  );
};

// export const ListadoArticuloSeleccionado = () => {
//   const gridRef = useRef<any>(null);
//   const [rowData, setRowData] = useState();
//   const { agregarContenido, detalle } = useContext(PedidoContext);

//   // Each Column Definition results in one Column.
//   const [columnDefs, setColumnDefs] = useState([
//     {
//       headerName: "Descripción",
//       field: "descripcion",
//       minWidth: 150,
//       checkboxSelection: true,
//     },
//     {
//       headerName: "Precio de venta",
//       field: "precio_venta",
//       minWidth: 150,
//     },
//     { headerName: "Categoría", field: "Categorias.descripcion", minWidth: 150 },
//     {
//       headerName: "Acciones",
//       field: "ACCIONES",
//       pinned: "right",
//       resizable: false,
//       width: 100,
//       filter: false,
//       cellRenderer: btnAcciones,
//     },
//   ]);

//   // DefaultColDef sets props common to all Columns
//   const defaultColDef = useMemo(
//     () => ({
//       sortable: true,
//       filter: true,
//       flex: 1,
//       floatingFilter: true,
//     }),
//     []
//   );
//   // const detalleDelPedido = detalle? detalle.map = (({id_articulo,cantidad,precio}:IDetallePedido) =>({
//   //   id_articulo: id_articulo,
//   //   cantidad: cantidad,
//   //   precio: precio
//   // }))
//   // :[]

//   useEffect(() => {
//     // setRowData();
//   }, [detalle]);

//   return <div></div>;
// };

// data={
//   categorias
//     ? categorias.map(({ descripcion, id }: any) => ({
//         label: descripcion,
//         value: id,
//       }))
//     : []
// }
// const registros =
// data?.edges?.map(({ node }, index) => {
//   return node;
// }) || [];
