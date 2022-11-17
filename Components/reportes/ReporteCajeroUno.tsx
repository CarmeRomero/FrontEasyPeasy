import { useState, useEffect } from "react";
import { useTicketsPagados } from "../../hooks/useTickets";
import { Box, Grid, TextInput, Divider, Button } from "@mantine/core";

import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const ReporteCajeroUno = () => {
  const [tarjeta, setTarjeta] = useState(0);
  const [efectivo, setEfectivo] = useState(0);
  const [otro, setOtro] = useState(0);

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
                    formaPago.formas_pago?.descripcion == "Efectivo" &&
                    moment(formaPago.fecha_hora).format("DD-MM-YYYY") ==
                      moment().format("DD-MM-YYYY")
                  ? setOtro((sumaOtro += parseInt(formaPago.total)))
                  : 0;
              })
            : [];
      });
  }, []);

  // const handleSubmit = (values: any) => {
  //   return values;
  // };

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
              Tarjeta
            </h2>

            <Box
              style={{
                border: "1px solid rgb(187, 162, 255)",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "100px",
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
              Efectivo
            </h2>
            <Box
              style={{
                border: "1px solid rgb(187, 162, 255)",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "100px",
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
                border: "1px solid rgb(187, 162, 255)",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "100px",
              }}
            >
              <h1>{otro}</h1>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
      {/* <form onSubmit={form.onSubmit(handleSubmit)}>
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
      </form> */}
    </>
  );
};
