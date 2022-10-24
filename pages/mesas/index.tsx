import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Mesa } from "../../Components/RegistrarMesa";

const MesasPage = () => {
  return (
    <DashboardLayout title="Registrar Pedido">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <Mesa />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default MesasPage;
