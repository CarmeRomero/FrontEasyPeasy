import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ReporteAdminCinco } from "../../Components/reportes/ReporteAdminCinco";

const AdminReporteTresPage = () => {
  return (
    <DashboardLayout title="Balance en el año">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ReporteAdminCinco />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminReporteTresPage;
