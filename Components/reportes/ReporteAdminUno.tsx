import { useState, useEffect } from "react";
import {
  useTicketsDesdeHasta,
  useTicketsPagados,
} from "../../hooks/useTickets";
import { Box, Grid, TextInput, Divider, Button } from "@mantine/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useFormasPago } from "../../hooks/useFormasPago";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ReporteAdminUno = () => {
  const [tarjeta, setTarjeta] = useState(0);
  const [efectivo, setEfectivo] = useState(0);
  const [otro, setOtro] = useState(0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const labels = ["Formas de pago"];

  const data = {
    labels,
    datasets: [
      {
        label: "Tarjeta",

        data: labels.map(() => tarjeta),

        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Efectivo",
        data: labels.map(() => efectivo),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Otros",
        data: labels.map(() => otro),
        backgroundColor: "rgb(170, 247, 189)",
      },
    ],
  };

  const { data: tickets, refetch } = useTicketsPagados();

  let sumaEfe = 0;
  let sumaTar = 0;
  let sumaOtro = 0;
  // useEffect(() => {
  //   tickets
  //     ? tickets.map((formaPago: any) => {
  //         formaPago.formas_pago?.descripcion == "Tarjeta"
  //           ? setTarjeta((sumaTar += 1))
  //           : formaPago.formas_pago?.descripcion == "Efectivo"
  //           ? setEfectivo((sumaEfe += 1))
  //           : setOtro((sumaOtro += 1));
  //       })
  //     : [];
  // }, [tickets]);

  useEffect(() => {
    refetch();
  }, [tarjeta, efectivo, otro]);

  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const form = useForm({
    initialValues: {
      desde: null,
      hasta: null,
    },
    validate: {},
  });

  const { data: TicketsDesdeHasta } = useTicketsDesdeHasta(
    new Date("2022-11-13T18:25:43.511Z"),
    new Date("s2022-11-11T18:25:43.511Z")
  );
  console.log(TicketsDesdeHasta);

  const handleSubmit = (values: any) => {
    // setDesde(values.desde);
    // setHasta(values.hasta);
    // cargarValores();
    console.log(TicketsDesdeHasta);
    return values;
  };

  const cargarValores = () =>
    TicketsDesdeHasta
      ? TicketsDesdeHasta.map((formaPago: any) => {
          formaPago.formas_pago?.descripcion == "Tarjeta"
            ? setTarjeta((sumaTar += 1))
            : formaPago.formas_pago?.descripcion == "Efectivo"
            ? setEfectivo((sumaEfe += 1))
            : setOtro((sumaOtro += 1));
        })
      : [];
  return (
    <>
      <Box>
        <Grid>
          <Grid.Col md={4}>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Pagos con tarjeta
            </h2>

            <Box
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "60px",
              }}
            >
              <h1>{tarjeta}</h1>
            </Box>
          </Grid.Col>
          <Grid.Col md={4}>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Pagos en efectivo
            </h2>
            <Box
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "60px",
              }}
            >
              <h1>{efectivo}</h1>
            </Box>
          </Grid.Col>
          <Grid.Col md={4}>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Otra forma de pago
            </h2>
            <Box
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "60px",
              }}
            >
              <h1>{otro}</h1>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
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
      <Bar
        style={{
          maxWidth: "800px",
          maxHeight: "800px",
          justifyContent: "center",
          alignContent: "center",
          marginLeft: "100px",
        }}
        options={options}
        data={data}
      />
    </>
  );
};

export function ReporteAdminTres() {
  // const { data: DataFormasPago } = useFormasPago();
  // const [formasPago, setFormasPago] = useState([]);
  // const labelsDatos = DataFormasPago
  //   ? DataFormasPago?.map(({ descripcion }: any) => ({
  //       label: descripcion,
  //     }))
  //   : [];
  // useEffect(() => {
  //   setFormasPago([]);
  //   labelsDatos.map((item: any) => {
  //     console.log(formasPago);
  //     const formPagoOb = { descripcion: "" };
  //     // const nuevoArreglo: any = [...formasPago, item.label];
  //     // setFormasPago(nuevoArreglo);
  //     setFormasPago((prev) => ({
  //       ...prev,
  //       descripcion: [...formasPago, item.label],
  //     }));
  //   });
  // }, []);
  // console.log(formasPago);
}
