import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { DiagramaMozo } from "../../Components/MostrarDiagramaMozo";

const MesasMozoPage = () => {
  return (
    <DashboardLayout title="Mesas atendidas">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <DiagramaMozo />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default MesasMozoPage;
