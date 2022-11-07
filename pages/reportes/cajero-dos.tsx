import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ReporteCajeroDos } from "../../Components/reportes/ReporteCajeroDos";

const AdminReporteUnoPage = () => {
  return (
    <DashboardLayout title="Reporte 2">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ReporteCajeroDos />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminReporteUnoPage;
