import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { PedidoProvider } from "../../context/pedido/pedidoProvider";

const RegistrarMesasPage = () => {
  return (
    <DashboardLayout title="Registrar Mesa">
      <PedidoProvider>
        <Grid columns={12}>
          <Grid.Col span={12}>
            {/* <RegistrarMesa /> */}
            {/* <RegistrarMesa nombrePlano={"entrada"} filas={10} columnas={10} /> */}
          </Grid.Col>
        </Grid>
      </PedidoProvider>
    </DashboardLayout>
  );
};

export default RegistrarMesasPage;
