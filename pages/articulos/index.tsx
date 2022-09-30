import { Grid } from "@mantine/core";
import { FormularioRegistrarArticulo } from "../../Components/Formularios/registrarArticulo";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";

const RegistrarArticuloPage = () => {
  return (
    <DashboardLayout title="Registrar Artículo">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <FormularioRegistrarArticulo />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default RegistrarArticuloPage;
