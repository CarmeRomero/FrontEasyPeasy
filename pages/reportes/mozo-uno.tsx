import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ReporteMozoUno } from "../../Components/reportes/ReporteMozoUno";

const AdminReporteUnoPage = () => {
  return (
    <DashboardLayout title="Reporte 1">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ReporteMozoUno />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminReporteUnoPage;
