import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ReporteAdminUno } from "../../Components/reportes/ReporteAdminUno";

const AdminReporteUnoPage = () => {
  return (
    <DashboardLayout title="Reporte 1">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ReporteAdminUno />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminReporteUnoPage;
