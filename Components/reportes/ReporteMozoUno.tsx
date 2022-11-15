import { Button, Grid, Table } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useTicketsDesdeHasta } from "../../hooks/useTickets";

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
    setDesde(values.desde);
    setHasta(values.hasta);

    // const response = await obtenerTicketFecha(values.desde, values.hasta);

    fetch(
      `http://localhost:3000/tickets/listado-tickets/desdeHasta?desde=${values.desde.toJSON()}&hasta=${values.hasta.toJSON()}`
    )
      .then((response) => response.json())
      .then((data) => setReportePedido(data));
  };

  console.log(reportePedido);

  const rows = reportePedido
    ? reportePedido.map((reportePedido: any) => (
        <tr key={reportePedido.id}>
          <td>{reportePedido.Usuarios.nombre}</td>

          <td>{reportePedido.Usuarios.apellido}</td>
        </tr>
      ))
    : [];

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
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : null}
    </>
  );
};

export const TablaReporte = () => {};
