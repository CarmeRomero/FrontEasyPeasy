import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ListadoArticulosMozo } from "../../Components/listados/ListadoArticulosMozo";

const RegistrarPedidoPage = () => {
  return (
    <DashboardLayout title="Registrar Artículo">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ListadoArticulosMozo />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default RegistrarPedidoPage;
