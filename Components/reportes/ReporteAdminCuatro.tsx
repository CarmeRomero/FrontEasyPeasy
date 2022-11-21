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
  BarElement,
  LineController,
  BarController,
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";
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

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
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
  const [ingresoenero, setIngresoEnero] = useState(0);
  const [ingresofebrero, setIngresoFebrero] = useState(0);
  const [ingresomarzo, setIngresoMarzo] = useState(0);
  const [ingresoabril, setIngresoAbril] = useState(0);
  const [ingresomayo, setIngresoMayo] = useState(0);
  const [ingresojunio, setIngresoJunio] = useState(0);
  const [ingresojulio, setIngresoJulio] = useState(0);
  const [ingresoagosto, setIngresoAgosto] = useState(0);
  const [ingresoseptiembre, setIngresoSeptiembre] = useState(0);
  const [ingresooctubre, setIngresoOctubre] = useState(0);
  const [ingresonoviembre, setIngresoNoviembre] = useState(0);
  const [ingresodiciembre, setIngresoDiciembre] = useState(0);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "El gráfico muestra la ganancia (expresada en miles) y cantidad de ventas mensual",
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
        type: "line" as const,
        label: "Cantidad de ventas mensuales",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
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
      },
      {
        type: "bar" as const,
        label: "Ingresos por mes, expresado en miles",
        backgroundColor: "rgb(75, 192, 192)",
        data: [
          ingresoenero,
          ingresofebrero,
          ingresomarzo,
          ingresoabril,
          ingresomayo,
          ingresojunio,
          ingresojulio,
          ingresoagosto,
          ingresoseptiembre,
          ingresooctubre,
          ingresonoviembre,
          ingresodiciembre,
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const { data: tickets, refetch } = useTicketsPagados();

  let countfeb = 0;
  let countene = 0;
  let countmar = 0;
  let countabr = 0;
  let countmay = 0;
  let countjun = 0;
  let countjul = 0;
  let countago = 0;
  let countsep = 0;
  let countoct = 0;
  let countnov = 0;
  let countdic = 0;

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
            ? setEnero((countene += 1))
            : mes == "2"
            ? setFebrero((countfeb += 1))
            : mes == "3"
            ? setMarzo((countmar += 1))
            : mes == "4"
            ? setAbril((countabr += 1))
            : mes == "5"
            ? setMayo((countmay += 1))
            : mes == "6"
            ? setJunio((countjun += 1))
            : mes == "7"
            ? setJulio((countjul += 1))
            : mes == "8"
            ? setAgosto((countago += 1))
            : mes == "9"
            ? setSeptiembre((countsep += 1))
            : mes == "10"
            ? setOctubre((countoct += 1))
            : mes == "11"
            ? setNoviembre((countnov += 1))
            : setDiciembre((countdic += 1));
        })
      : [];

    tickets
      ? tickets.map((fecha: any) => {
          const mes = moment(fecha.fecha_hora).format("MM");
          console.log(mes);
          mes == "1"
            ? setIngresoEnero((ene += parseInt(fecha.total)) / 1000)
            : mes == "2"
            ? setIngresoFebrero((feb += parseInt(fecha.total)) / 1000)
            : mes == "3"
            ? setIngresoMarzo((mar += parseInt(fecha.total)) / 1000)
            : mes == "4"
            ? setIngresoAbril((abr += parseInt(fecha.total)) / 1000)
            : mes == "5"
            ? setIngresoMayo((may += parseInt(fecha.total)) / 1000)
            : mes == "6"
            ? setIngresoJunio((jun += parseInt(fecha.total)) / 1000)
            : mes == "7"
            ? setIngresoJulio((jul += parseInt(fecha.total)) / 1000)
            : mes == "8"
            ? setIngresoAgosto((ago += parseInt(fecha.total)) / 1000)
            : mes == "9"
            ? setIngresoSeptiembre((sep += parseInt(fecha.total)) / 1000)
            : mes == "10"
            ? setIngresoOctubre((oct += parseInt(fecha.total)) / 1000)
            : mes == "11"
            ? setIngresoNoviembre((nov += parseInt(fecha.total)) / 1000)
            : setIngresoDiciembre((dic += parseInt(fecha.total)) / 1000);
        })
      : [];
  }, [tickets]);
  console.log(setIngresoNoviembre);

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
      <Chart
        type="bar"
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
