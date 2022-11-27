import { useState, useEffect } from "react";
import { useTicketsPagados } from "../../hooks/useTickets";
import { Box, Grid, TextInput, Divider, Button } from "@mantine/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment";
import "moment/locale/es";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";

moment.locale("es");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
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
  const [ingresolunes, setIngresoLunes] = useState(0);
  const [ingresomartes, setIngresoMartes] = useState(0);
  const [ingresomiercoles, setIngresoMiercoles] = useState(0);
  const [ingresojueves, setIngresoJueves] = useState(0);
  const [ingresoviernes, setIngresoViernes] = useState(0);
  const [ingresosabado, setIngresoSabado] = useState(0);
  const [ingresodomingo, setIngresoDomingo] = useState(0);

  const [promediolunes, setPromedioLunes] = useState(0);
  const [promediomartes, setPromedioMartes] = useState(0);
  const [promediomiercoles, setPromedioMiercoles] = useState(0);
  const [promediojueves, setPromedioJueves] = useState(0);
  const [promedioviernes, setPromedioViernes] = useState(0);
  const [promediosabado, setPromedioSabado] = useState(0);
  const [promediodomingo, setPromedioDomingo] = useState(0);

  const form = useForm({
    initialValues: {
      desde: null,
      hasta: null,
    },
    validate: {},
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "El gráfico muestra lo que gasta un cliente en promedio por cada día de la semana dentro del plazo ingresado.",
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

  const [datos, setdatos] = useState({
    labels: labels,
    datasets: [
      {
        label: "Gasto promedio por cliente",
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
  });

  const { data: tickets, refetch } = useTicketsPagados();

  const handleSubmit = (values: any) => {
    fetch(
      `http://localhost:3000/tickets/listado-tickets/desdeHasta?desde=${values.desde.toJSON()}&hasta=${values.hasta.toJSON()}`
    )
      .then((response) => response.json())
      .then((data) => {
        let sumlun = 0;
        let summar = 0;
        let summier = 0;
        let sumjue = 0;
        let sumvie = 0;
        let sumsab = 0;
        let sumdom = 0;

        let lun = 0;
        let mar = 0;
        let mier = 0;
        let jue = 0;
        let vie = 0;
        let sab = 0;
        let dom = 0;

        data
          ? data.map((fecha: any) => {
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
        data
          ? data.map((fecha: any) => {
              const dia = moment(fecha.fecha_hora).format("dddd");
              console.log(dia);
              dia == "lunes"
                ? setIngresoLunes((sumlun += parseInt(fecha.total)))
                : dia == "martes"
                ? setIngresoMartes((summar += parseInt(fecha.total)))
                : dia == "miércoles"
                ? setIngresoMiercoles((summier += parseInt(fecha.total)))
                : dia == "jueves"
                ? setIngresoJueves((sumjue += parseInt(fecha.total)))
                : dia == "viernes"
                ? setIngresoViernes((sumvie += parseInt(fecha.total)))
                : dia == "sábado"
                ? setIngresoSabado((sumsab += parseInt(fecha.total)))
                : setIngresoDomingo((sumdom += parseInt(fecha.total)));
            })
          : [];
      });

    return values;
  };

  useEffect(() => {
    setPromedioLunes(ingresolunes / lunes);
    setPromedioMartes(ingresomartes / martes);
    setPromedioMiercoles(ingresomiercoles / miercoles);
    setPromedioJueves(ingresojueves / jueves);
    setPromedioViernes(ingresoviernes / viernes);
    setPromedioSabado(ingresosabado / sabado);
    setPromedioDomingo(ingresodomingo / domingo);

    setdatos({
      labels: labels,
      datasets: [
        {
          label: "Gasto promedio por cliente",

          data: [
            promediolunes,
            promediomartes,
            promediomiercoles,
            promediojueves,
            promedioviernes,
            promediosabado,
            promediodomingo,
          ],
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
    });
  }, [
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo,
    promediolunes,
    promediomartes,
    promediomiercoles,
    promediojueves,
    promedioviernes,
    promediosabado,
    promediodomingo,
  ]);

  useEffect(() => {}, [tickets]);

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
      <Box sx={{ justifyContent: "center" }} px={"110px"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col xs={5}>
              <DatePicker
                placeholder="Seleccione una fecha"
                label="Desde"
                required
                {...form.getInputProps("desde")}
              />
            </Grid.Col>
            <Grid.Col xs={5}>
              <DatePicker
                placeholder="Seleccione una fecha"
                label="Hasta"
                required
                {...form.getInputProps("hasta")}
              />
            </Grid.Col>
            <Grid.Col xs={2}>
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
        </form>
      </Box>
      <Bar
        style={{
          maxWidth: "800px",
          maxHeight: "800px",
          justifyContent: "center",
          alignContent: "center",
          marginLeft: "100px",
          marginTop: "20px",
        }}
        options={options}
        data={datos}
      />
    </>
  );
};
