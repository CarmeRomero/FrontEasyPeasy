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

export const ReporteAdminUnoBKP = () => {
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

  const labels = ["Tarjeta", "efectivo", "otro"];

  const [datos, setdatos] = useState({
    labels: labels,
    datasets: [
      {
        label: "Cantidad",

        data: [tarjeta, efectivo, otro],

        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgb(170, 247, 189)",
        ],
      },
    ],
  });

  const { data: tickets, refetch } = useTicketsPagados();

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

  // useEffect(() => {
  //   refetch();
  // }, [tarjeta, efectivo, otro]);

  const form = useForm({
    initialValues: {
      desde: null,
      hasta: null,
    },
    validate: {},
  });

  const handleSubmit = (values: any) => {
    fetch(
      `http://localhost:3000/tickets/listado-tickets/desdeHasta?desde=${values.desde.toJSON()}&hasta=${values.hasta.toJSON()}`
    )
      .then((response) => response.json())
      .then((data) => {
        let sumaEfe = 0;
        let sumaTar = 0;
        let sumaOtro = 0;
        setTarjeta(0),
          setEfectivo(0),
          setOtro(0),
          data
            ? data?.map((formaPago: any) => {
                formaPago.formas_pago?.descripcion == "Tarjeta"
                  ? setTarjeta((sumaTar += 1))
                  : formaPago.formas_pago?.descripcion == "Efectivo"
                  ? setEfectivo((sumaEfe += 1))
                  : setOtro((sumaOtro += 1));
              })
            : [];
        console.log(data);
      });

    return values;
  };

  useEffect(() => {
    setdatos({
      labels: labels,
      datasets: [
        {
          label: "Cantidad",

          data: [tarjeta, efectivo, otro],

          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(53, 162, 235, 0.5)",
            "rgb(170, 247, 189)",
          ],
        },
      ],
    });
  }, [tarjeta, efectivo, otro]);

  return (
    <>
      <Box>
        <Grid>
          <Grid.Col md={4}>
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Pagos con tarjeta
            </h3>

            <Box
              style={{
                border: "1px solid rgb(187, 162, 255)",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "60px",
              }}
            >
              <h3>{tarjeta}</h3>
            </Box>
          </Grid.Col>
          <Grid.Col md={4}>
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Pagos en efectivo
            </h3>
            <Box
              style={{
                border: "1px solid rgb(187, 162, 255)",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "60px",
              }}
            >
              <h3>{efectivo}</h3>
            </Box>
          </Grid.Col>
          <Grid.Col md={4}>
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Otra forma de pago
            </h3>
            <Box
              style={{
                border: "1px solid rgb(187, 162, 255)",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "60px",
              }}
            >
              <h3>{otro}</h3>
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
          maxHeight: "350px",
          justifyContent: "center",
          alignContent: "center",
          marginLeft: "100px",
        }}
        options={options}
        data={datos}
        // onUpdate={updatePlot}
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
