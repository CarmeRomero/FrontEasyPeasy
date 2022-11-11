import { useState, useEffect } from "react";
import { useTicketsPagados } from "../../hooks/useTickets";
import { Box, Grid, TextInput, Divider } from "@mantine/core";
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
import { prepareServerlessUrl } from "next/dist/server/base-server";

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
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
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
  useEffect(() => {
    tickets
      ? tickets.map((formaPago: any) => {
          formaPago.formas_pago?.descripcion == "Tarjeta"
            ? setTarjeta((sumaTar += 1))
            : formaPago.formas_pago?.descripcion == "Efectivo"
            ? setEfectivo((sumaEfe += 1))
            : setOtro((sumaOtro += 1));
        })
      : [];
  }, [tickets]);

  useEffect(() => {
    refetch();
  }, [tarjeta, efectivo, otro]);

  console.log(tarjeta);
  console.log(efectivo);
  console.log(otro);

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
