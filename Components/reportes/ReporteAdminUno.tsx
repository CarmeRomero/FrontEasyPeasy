import { useState, useEffect } from "react";
import { useTicketsPagados } from "../../hooks/useTickets";
import {
  Box,
  Grid,
  Button,
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
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
import { ArrowDownRight, ArrowUpRight } from "tabler-icons-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export const ReporteAdminUno = () => {
  const { classes } = useStyles();

  const [tarjeta, setTarjeta] = useState(0);
  const [efectivo, setEfectivo] = useState(0);
  const [otro, setOtro] = useState(0);
  const [countTarjeta, setCountTarjeta] = useState(0);
  const [countEfectivo, setCountEfectivo] = useState(0);
  const [countOtro, setCountOtro] = useState(0);
  const [total, setTotal] = useState(0);
  const [porcentajeTarjeta, setPorcentajeTarjeta] = useState(0);
  const [porcentajeEfectivo, setPorcentajeEfectivo] = useState(0);
  const [porcentajeOtros, setPorcentajeOtros] = useState(0);

  const data = [
    {
      title: "Tarjeta",
      value: "$ " + tarjeta,
      cantidad: countTarjeta,
      // diff: (tarjeta / tarjetaDiaAnterior) * 100 - 100,
    },
    {
      title: "Efectivo",
      value: "$ " + efectivo,
      cantidad: countEfectivo,
      // diff: (efectivo / efectivoDiaAnterior) * 100 - 100,
    },
    {
      title: "Otra forma de pago",
      value: "$ " + otro,
      cantidad: countOtro,
      // diff: (otro / otroDiaAnterior) * 100 - 100,
    },
  ];

  const stats = data.map((stat) => {
    // const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper
        withBorder
        p="md"
        radius="md"
        key={stat.title}
        style={{ backgroundColor: "rgb(139, 125, 123,.1)" }}
      >
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="md"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>

            <Text
              color="dimmed"
              // transform="lowercase"
              weight={700}
              size="md"
              className={classes.label}
            >
              Tickets generados: {stat.cantidad}
            </Text>
          </div>
          {/* <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon> */}
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            // color={stat.diff > 0 ? "teal" : "red"}
            weight={700}
          >
            {/* {stat.diff === NaN || stat.diff == Infinity ? 0 : stat.diff} % */}
          </Text>{" "}
          {/* {stat.diff > 0 ? "Aumento" : "Decremento"} comparado con ayer */}
        </Text>
      </Paper>
    );
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "El gráfico muestra qué porcentaje de los ingresos fue abonado a través de tarjeta, en efectivo o con otra forma de pago",
      },
    },
  };

  const labels = ["Tarjeta", "Efectivo", "Otro"];

  const [datos, setdatos] = useState({
    labels: labels,
    datasets: [
      {
        label: "Porcentaje",

        data: [porcentajeTarjeta, porcentajeEfectivo, porcentajeOtros],

        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgb(170, 247, 189)",
        ],
      },
    ],
  });

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
        let countTar = 0;
        let countEfe = 0;
        let countOtro = 0;
        setTarjeta(0), setEfectivo(0), setOtro(0), setCountEfectivo(0);
        setCountOtro(0);
        setCountTarjeta(0);
        setPorcentajeEfectivo(0);
        setPorcentajeTarjeta(0);
        setPorcentajeOtros(0);
        data
          ? data?.map((formaPago: any) => {
              formaPago.formas_pago?.descripcion == "Tarjeta"
                ? setCountTarjeta((countTar += 1))
                : formaPago.formas_pago?.descripcion == "Efectivo"
                ? setCountEfectivo((countEfe += 1))
                : setCountOtro((countOtro += 1));
            })
          : [];
        data
          ? data?.map((formaPago: any) => {
              formaPago.formas_pago?.descripcion == "Tarjeta"
                ? setTarjeta((sumaTar += parseInt(formaPago.total)))
                : formaPago.formas_pago?.descripcion == "Efectivo"
                ? setEfectivo((sumaEfe += parseInt(formaPago.total)))
                : setOtro((sumaOtro += parseInt(formaPago.total)));
            })
          : [];
      });

    return values;
  };

  useEffect(() => {
    setTotal(tarjeta + efectivo + otro);
    setPorcentajeEfectivo((efectivo * 100) / total);
    setPorcentajeTarjeta((tarjeta * 100) / total);
    setPorcentajeOtros((otro * 100) / total);
    setdatos({
      labels: labels,
      datasets: [
        {
          label: "Porcentaje",

          data: [porcentajeTarjeta, porcentajeEfectivo, porcentajeOtros],

          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(53, 162, 235, 0.5)",
            "rgb(170, 247, 189)",
          ],
        },
      ],
    });
  }, [
    tarjeta,
    efectivo,
    otro,
    porcentajeTarjeta,
    porcentajeEfectivo,
    porcentajeOtros,
    total,
  ]);

  return (
    <>
      <div className={classes.root} style={{ color: "#f6dcac" }}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {stats}
        </SimpleGrid>
      </div>
      <Box sx={{ justifyContent: "center" }} px={"36px"}>
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
      </Box>

      <Bar
        style={{
          maxWidth: "800px",
          maxHeight: "350px",
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
