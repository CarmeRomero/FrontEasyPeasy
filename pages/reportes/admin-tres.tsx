import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ReporteAdminTres } from "../../Components/reportes/ReporteAdminTres";

const AdminReporteTresPage = () => {
  return (
    <DashboardLayout title="Reporte 3">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ReporteAdminTres />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminReporteTresPage;
