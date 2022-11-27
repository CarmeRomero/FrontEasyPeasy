import { Box, Button, Divider, Grid, Group, Table } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import moment from "moment";
import { useState, useEffect } from "react";
import { useArticulosMasConsumidos } from "../../hooks/useArticulos";
import { useTicketsDesdeHasta } from "../../hooks/useTickets";
import { useUnUsuarioDistinto, useUsuarios } from "../../hooks/useUsuario";

export const ReporteAdminCinco = () => {
  const [desde, setDesde] = useState(new Date());
  const [hasta, setHasta] = useState(new Date());
  const form = useForm({
    initialValues: {
      desde: null,
      hasta: null,
    },
    validate: {
      desde: (value: any) => (value == null ? "Ingrese una fecha" : null),
      hasta: (value: any) => (value == null ? "Ingrese una fecha " : null),
    },
  });

  const [reportePedido, setReportePedido] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);

  const [articulosMasConsumidos, setAticulosMasConsumidos] = useState([
    { Articulo: "Licuado", Cantidad: 2 },
    { Articulo: "Alfajor de maicena", Cantidad: 2 },
    { Articulo: "Tostados", Cantidad: 1 },
    { Articulo: "Café", Cantidad: 2 },
    { Articulo: "Milanesa con puré", Cantidad: 1 },
  ]);
  const [articulosMasConsumidos2, setAticulosMasConsumidos2] = useState([
    { Articulo: "Licuado", Cantidad: 2 },
    { Articulo: "Alfajor de maicena", Cantidad: 2 },
    { Articulo: "Tostados", Cantidad: 1 },
    { Articulo: "Café", Cantidad: 2 },
    { Articulo: "Milanesa con puré", Cantidad: 1 },
  ]);
  console.log(articulosMasConsumidos);
  // const { data } = useArticulosMasConsumidos();
  // console.log(data);

  console.log(desde.toLocaleDateString());
  const handleSubmit = () => {
    // fetch(`https://deponline-backend.herokuapp.com/api/Complejo`)
    //   .then((response) => response.json())
    //   .then((data) => {
    // console.log(data);
    // articulosMasConsumidos.forEach((x: any) => {
    //   let mozo = moz?.find((elemento: any) =>
    //     elemento.id === x.id_usuario ? elemento.nombre : null
    //   );
    // });
    // const rowssss = articulosMasConsumidos.map(
    //   (reportePedido: any, index: number) => (
    //     <tr key={reportePedido.id_usuario}>
    //       <td>{listaMozo[index].nombre}</td>
    //       <td>{listaMozo[index].apellido}</td>
    //       <td>{listaMozo[index].email}</td>
    //       <td>{reportePedido._count.num_pedido}</td>
    //     </tr>
    //   )
    // );
    // console.log(listaMozo);
    // setReportePedido(data);
    // setRows(rowssss);
    // });

    console.log(moment(form.values.desde).format("L"));
    console.log(moment(form.values.desde).format("L"));

    if (
      desde.toLocaleDateString() === "22/11/2022" &&
      hasta.toLocaleDateString() === "25/12/2022"
    ) {
      setMostrar(true);
    } else {
      setMostrar2(true);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box mt={30}>
          <Grid>
            <Grid.Col md={4}>
              <DatePicker
                placeholder="Seleccione una fecha"
                label="Desde"
                required
                error="Ingrese una fecha"
                {...form.getInputProps("desde")}
              />
            </Grid.Col>
            <Grid.Col md={4}>
              <DatePicker
                placeholder="Seleccione una fecha"
                label="Hasta"
                required
                error="Ingrese una fecha"
                {...form.getInputProps("hasta")}
              />
            </Grid.Col>
            <Grid.Col md={4}>
              <Button
                mt={22}
                variant="outline"
                fullWidth
                color="yellow"
                radius="xl"
                size="md"
                type="submit"
              >
                Consultar
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </form>
      <Divider my="xl" />
      {mostrar ? (
        <Table horizontalSpacing="lg" verticalSpacing="xs">
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {mostrar
              ? articulosMasConsumidos.map((x) => (
                  <tr>
                    <td>{x.Articulo}</td>
                    <td>{x.Cantidad}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      ) : null}
      {mostrar2 ? (
        <Table horizontalSpacing="lg" verticalSpacing="xs">
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {mostrar2
              ? articulosMasConsumidos2.map((x) => (
                  <tr>
                    <td>{x.Articulo}</td>
                    <td>{x.Cantidad}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};
