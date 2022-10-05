import { Grid } from "@mantine/core";
import { FormularioDatosUsuario } from "../../Components/Formularios/misDatos";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";

const MisDatosPage = () => {
  return (
    <DashboardLayout title="Mis datos">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <FormularioDatosUsuario />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default MisDatosPage;
