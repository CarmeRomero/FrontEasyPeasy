import { Button, Grid, Table } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { useTicketsDesdeHasta } from "../../hooks/useTickets";
import { useUnUsuarioDistinto, useUsuarios } from "../../hooks/useUsuario";

export const ReporteMozoUno = () => {
  const [desde, setDesde] = useState(new Date());
  const [hasta, setHasta] = useState(new Date());
  const form = useForm({
    initialValues: {
      desde: null,
      hasta: null,
    },
    validate: {},
  });

  // const { data } = useTicketsDesdeHasta(desde, hasta);

  const [reportePedido, setReportePedido] = useState([]);

  const handleSubmit = async (values: any) => {
    fetch(
      `http://localhost:3000/pedidos/listado-pedido/desdeHasta?desde=${values.desde.toJSON()}&hasta=${values.hasta.toJSON()}`
    )
      .then((response) => response.json())
      .then((data) => {
        let listaMozo: any = [];

        data.forEach((x: any) => {
          let mozo = moz?.find((elemento: any) =>
            elemento.id === x.id_usuario ? elemento.nombre : null
          );
          listaMozo.push(mozo);
        });
        console.log(listaMozo);
        const rowssss = data
          ? data.map((reportePedido: any, index: number) => (
              <tr key={reportePedido.id_usuario}>
                <td>{listaMozo[index].nombre}</td>
                <td>{listaMozo[index].apellido}</td>
                <td>{reportePedido._count.num_pedido}</td>
              </tr>
            ))
          : [];
        setReportePedido(data);
        setRows(rowssss);
      });
  };

  console.log(reportePedido);

  const [listaUsuarios, setListaUsuarios] = useState([]);

  const { data: moz } = useUsuarios();

  useEffect(() => {
    console.log(listaUsuarios);
  }, [reportePedido]);

  const [rows, setRows] = useState(null);

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col md={4}>
            <DatePicker
              placeholder="Seleccione una fecha"
              label="Desde"
              required
              {...form.getInputProps("desde")}
            />
          </Grid.Col>
          <Grid.Col md={4}>
            <DatePicker
              placeholder="Seleccione una fecha"
              label="Hasta"
              required
              {...form.getInputProps("hasta")}
            />
          </Grid.Col>
          <Grid.Col md={4}>
            <Button
              mt={22}
              variant="outline"
              fullWidth
              color="grape"
              radius="xl"
              size="md"
              type="submit"
            >
              Consultar
            </Button>
          </Grid.Col>
        </Grid>
      </form>
      {reportePedido.length > 0 ? (
        <Table horizontalSpacing="lg" verticalSpacing="xs">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : null}
    </>
  );
};
