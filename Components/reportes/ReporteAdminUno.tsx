import { useState, useEffect } from "react";
import { useTicketsPagados } from "../../hooks/useTickets";
import { Box, Grid, TextInput, Divider } from "@mantine/core";
import { BorderAll } from "tabler-icons-react";

export const ReporteAdminUno = () => {
  const [tarjeta, setTarjeta] = useState(0);
  const [efectivo, setEfectivo] = useState(0);
  const [otro, setOtro] = useState(0);

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
            }}
          >
            <h1>{otro}</h1>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
