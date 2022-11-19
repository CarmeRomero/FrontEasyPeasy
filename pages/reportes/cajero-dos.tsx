import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ReporteCajeroUno } from "../../Components/reportes/ReporteCajeroUno-BKP";

const AdminReporteUnoPage = () => {
  return (
    <DashboardLayout title="Caja">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ReporteCajeroUno />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminReporteUnoPage;
