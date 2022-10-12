import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ListadoPedidos } from "../../Components/listados/ListadoPedidos";

const ListadoPedidosPage = () => {
  return (
    <DashboardLayout title="Listado de usuarios">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ListadoPedidos />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default ListadoPedidosPage;
