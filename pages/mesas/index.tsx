import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Diagrama } from "../../Components/ActualizarDiagrama";

const MesasPage = () => {
  return (
    <DashboardLayout title="Registrar mesas">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <Diagrama />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default MesasPage;
