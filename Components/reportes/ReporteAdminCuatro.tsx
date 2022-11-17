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
  Filler,
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
  Filler,
  Legend
);

export const ReporteAdminCuatro = () => {
  const [fecha, setFecha] = useState([]);
  const [enero, setEnero] = useState(0);
  const [febrero, setFebrero] = useState(0);
  const [marzo, setMarzo] = useState(0);
  const [abril, setAbril] = useState(0);
  const [mayo, setMayo] = useState(0);
  const [junio, setJunio] = useState(0);
  const [julio, setJulio] = useState(0);
  const [agosto, setAgosto] = useState(0);
  const [septiembre, setSeptiembre] = useState(0);
  const [octubre, setOctubre] = useState(0);
  const [noviembre, setNoviembre] = useState(0);
  const [diciembre, setDiciembre] = useState(0);
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
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: "Ventas en el año",
        data: [
          enero,
          febrero,
          marzo,
          abril,
          mayo,
          junio,
          julio,
          agosto,
          septiembre,
          octubre,
          noviembre,
          diciembre,
        ],

        backgroundColor: ["rgb(190, 171, 242)"],
        borderColor: "rgb(53, 162, 235)",
      },
    ],
  };

  const { data: tickets, refetch } = useTicketsPagados();

  let ene = 0;
  let feb = 0;
  let mar = 0;
  let abr = 0;
  let may = 0;
  let jun = 0;
  let jul = 0;
  let ago = 0;
  let sep = 0;
  let oct = 0;
  let nov = 0;
  let dic = 0;

  useEffect(() => {
    tickets
      ? tickets.map((fecha: any) => {
          const mes = moment(fecha.fecha_hora).format("MM");
          console.log(mes);
          mes == "1"
            ? setEnero((ene += 1))
            : mes == "2"
            ? setFebrero((feb += 1))
            : mes == "3"
            ? setMarzo((mar += 1))
            : mes == "4"
            ? setAbril((abr += 1))
            : mes == "5"
            ? setMayo((may += 1))
            : mes == "6"
            ? setJunio((jun += 1))
            : mes == "7"
            ? setJulio((jul += 1))
            : mes == "8"
            ? setAgosto((ago += 1))
            : mes == "9"
            ? setSeptiembre((sep += 1))
            : mes == "10"
            ? setOctubre((oct += 1))
            : mes == "11"
            ? setNoviembre((nov += 1))
            : setDiciembre((dic += 1));
        })
      : [];
  }, [tickets]);

  // useEffect(() => {
  //   refetch();
  // }, [tarjeta, efectivo, otro]);

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
