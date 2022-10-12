import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ListadoArticulosMozo } from "../../Components/listados/ListadoArticulosMozo";
import { PedidoProvider } from "../../context/pedido/pedidoProvider";

const RegistrarPedidoPage = () => {
  return (
    <DashboardLayout title="Registrar Pedido">
      <PedidoProvider>
        <Grid columns={12}>
          <Grid.Col span={12}>
            <ListadoArticulosMozo />
          </Grid.Col>
        </Grid>
      </PedidoProvider>
    </DashboardLayout>
  );
};

export default RegistrarPedidoPage;
