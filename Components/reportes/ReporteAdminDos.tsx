import { useState, useEffect } from "react";
import { useTicketsPagados } from "../../hooks/useTickets";
import { Box, Grid, TextInput, Divider } from "@mantine/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ReporteAdminDos = () => {
  const [fecha, setFecha] = useState([]);
  const [lunes, setLunes] = useState(0);
  const [martes, setMartes] = useState(0);
  const [miercoles, setMiercoles] = useState(0);
  const [jueves, setJueves] = useState(0);
  const [viernes, setViernes] = useState(0);
  const [sabado, setSabado] = useState(0);
  const [domingo, setDomingo] = useState(0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const labels = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Pedidos por día",
        data: [lunes, martes, miercoles, jueves, viernes, sabado, domingo],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "#BB78FF",
          "#B8E9FF",
          "#FFA28C",
          "#8EFFBA",
          "#2A8EFF",
          "#E1FF3E",
        ],
        borderColor: "rgb(204, 191, 242)",
      },
    ],
  };

  const { data: tickets, refetch } = useTicketsPagados();

  let lun = 0;
  let mar = 0;
  let mier = 0;
  let jue = 0;
  let vie = 0;
  let sab = 0;
  let dom = 0;

  useEffect(() => {
    tickets
      ? tickets.map((fecha: any) => {
          const dia = moment(fecha.fecha_hora).format("dddd");
          console.log(dia);
          dia == "lunes"
            ? setLunes((lun += 1))
            : dia == "martes"
            ? setMartes((mar += 1))
            : dia == "miércoles"
            ? setMiercoles((mier += 1))
            : dia == "jueves"
            ? setJueves((jue += 1))
            : dia == "viernes"
            ? setViernes((vie += 1))
            : dia == "sábado"
            ? setSabado((sab += 1))
            : setDomingo((dom += 1));
        })
      : [];
  }, [tickets]);

  // useEffect(() => {
  //   refetch();
  // }, [tarjeta, efectivo, otro]);

  console.log(lunes);
  console.log(martes);
  console.log(miercoles);
  console.log(jueves);
  console.log(viernes);
  console.log(sabado);
  console.log(domingo);

  return (
    <>
      <Box>
        <Grid>
          <Grid.Col md={4}></Grid.Col>
        </Grid>
      </Box>
      <Line
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
