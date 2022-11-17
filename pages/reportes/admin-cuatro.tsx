import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ReporteAdminCuatro } from "../../Components/reportes/ReporteAdminCuatro";

const AdminReporteTresPage = () => {
  return (
    <DashboardLayout title="Balance en el año">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ReporteAdminCuatro />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminReporteTresPage;
