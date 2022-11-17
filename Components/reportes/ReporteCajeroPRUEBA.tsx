import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import { ArrowDownRight, ArrowUpRight } from "tabler-icons-react";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { useTicketsPagados } from "../../hooks/useTickets";
moment.locale("es");

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function StatsGridIcons() {
  const { classes } = useStyles();

  const [tarjeta, setTarjeta] = useState(0);
  const [efectivo, setEfectivo] = useState(0);
  const [otro, setOtro] = useState(0);
  const [countTarjeta, setCountTarjeta] = useState(0);
  const [countEfectivo, setCountEfectivo] = useState(0);
  const [countOtro, setCountOtro] = useState(0);
  const [tarjetaDiaAnterior, setTarjetaDiaAnterior] = useState(0);
  const [efectivoDiaAnterior, setEfectivoDiaAnterior] = useState(0);
  const [otroDiaAnterior, setOtroDiaAnterior] = useState(0);

  const { data: tickets, refetch } = useTicketsPagados();

  useEffect(() => {
    refetch();
  }, [tarjeta, efectivo, otro]);

  useEffect(() => {
    fetch(`http://localhost:3000/tickets/tickets-pagados`)
      .then((response) => response.json())
      .then((data) => {
        let sumaEfe = 0;
        let sumaTar = 0;
        let sumaOtro = 0;
        let countTar = 0;
        let countEfe = 0;
        let countOtr = 0;
        let sumaEfeDiaAnterior = 0;
        let sumaTarDiaAnterior = 0;
        let sumaOtroDiaAnterior = 0;
        setTarjeta(0),
          setEfectivo(0),
          setOtro(0),
          data
            ? data?.map((formaPago: any) => {
                formaPago.formas_pago?.descripcion == "Tarjeta" &&
                moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                  moment().format("DD-MM-YYYY")
                  ? setTarjeta((sumaTar += parseInt(formaPago.total)))
                  : formaPago.formas_pago?.descripcion == "Efectivo" &&
                    moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                      moment().format("DD-MM-YYYY")
                  ? setEfectivo((sumaEfe += parseInt(formaPago.total)))
                  : formaPago.formas_pago?.descripcion !== "Tarjeta" &&
                    formaPago.formas_pago?.descripcion !== "Efectivo" &&
                    moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                      moment().format("DD-MM-YYYY")
                  ? setOtro((sumaOtro += parseInt(formaPago.total)))
                  : 0;
                console.log(moment(formaPago.fecha_hora).format("DD-MM-YYYY"));
              })
            : [];

        data
          ? data?.map((formaPago: any) => {
              formaPago.formas_pago?.descripcion == "Tarjeta" &&
              moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                moment().format("DD-MM-YYYY")
                ? setCountTarjeta((countTar += 1))
                : formaPago.formas_pago?.descripcion == "Efectivo" &&
                  moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                    moment().format("DD-MM-YYYY")
                ? setCountEfectivo((countEfe += 1))
                : formaPago.formas_pago?.descripcion !== "Tarjeta" &&
                  formaPago.formas_pago?.descripcion !== "Efectivo" &&
                  moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                    moment().format("DD-MM-YYYY")
                ? setCountOtro((countOtr += 1))
                : 0;
            })
          : [];

        data
          ? data?.map((formaPago: any) => {
              formaPago.formas_pago?.descripcion == "Tarjeta" &&
              moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                moment().subtract(1, "days").format("DD-MM-YYYY")
                ? setTarjetaDiaAnterior(
                    (sumaTarDiaAnterior += parseInt(formaPago.total))
                  )
                : formaPago.formas_pago?.descripcion == "Efectivo" &&
                  moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                    moment().subtract(1, "days").format("DD-MM-YYYY")
                ? setEfectivoDiaAnterior(
                    (sumaEfeDiaAnterior += parseInt(formaPago.total))
                  )
                : formaPago.formas_pago?.descripcion !== "Tarjeta" &&
                  formaPago.formas_pago?.descripcion !== "Efectivo" &&
                  moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                    moment().subtract(1, "days").format("DD-MM-YYYY")
                ? setOtroDiaAnterior(
                    (sumaOtroDiaAnterior += parseInt(formaPago.total))
                  )
                : 0;
            })
          : [];

        console.log(moment().format("DD-MM-YYYY"));

        console.log(sumaEfe);
        console.log(sumaTar);
        console.log(sumaOtro);
        console.log(countTar);
        console.log(countEfe);
        console.log(countOtro);
        console.log(sumaEfeDiaAnterior);
        console.log(sumaTarDiaAnterior);
        console.log(sumaOtroDiaAnterior);
      });
  }, [tarjeta, efectivo, otro, countEfectivo, countOtro, countTarjeta]);

  const data = [
    {
      title: "Tarjeta",
      value: "$ " + tarjeta,
      cantidad: countTarjeta,
      diff: (tarjeta / tarjetaDiaAnterior) * 100 - 100,
    },
    {
      title: "Efectivo",
      value: "$ " + efectivo,
      cantidad: countEfectivo,
      diff: (efectivo / efectivoDiaAnterior) * 100 - 100,
    },
    {
      title: "Otra forma de pago",
      value: "$ " + otro,
      cantidad: countOtro,
      diff: (otro / otroDiaAnterior) * 100 - 100,
    },
  ];
  console.log(data);

  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
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
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={stat.diff > 0 ? "teal" : "red"}
            weight={700}
          >
            {isNaN(stat.diff) || stat.diff == Infinity
              ? 0
              : Math.round(stat.diff)}{" "}
            %
          </Text>{" "}
          {stat.diff > 0 ? "Por encima" : "Por abajo"} del día de ayer.
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}
