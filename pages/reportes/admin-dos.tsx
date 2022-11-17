import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ReporteAdminDos } from "../../Components/reportes/ReporteAdminDos";

const AdminReporteUnoPage = () => {
  return (
    <DashboardLayout title="Días de la semana con más recurrencia">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ReporteAdminDos />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminReporteUnoPage;
