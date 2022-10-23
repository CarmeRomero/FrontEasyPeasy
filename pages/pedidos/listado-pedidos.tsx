import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ListadoPedidos } from "../../Components/listados/ListadoPedidos";
import { PedidoProvider } from "../../context/pedido/pedidoProvider";

const ListadoPedidosPage = () => {
  return (
    <DashboardLayout title="Listado de pedidos">
      <PedidoProvider>
        <Grid columns={12}>
          <Grid.Col span={12}>
            <ListadoPedidos />
          </Grid.Col>
        </Grid>
      </PedidoProvider>
    </DashboardLayout>
  );
};

export default ListadoPedidosPage;
