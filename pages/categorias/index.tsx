import { Grid } from "@mantine/core";
import { RegistrarCategoria } from "../../Components/Formularios/registrarCategoria";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";

const RegistrarCategoriaPage = () => {
  return (
    <DashboardLayout title="Registrar Categoría">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <RegistrarCategoria />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default RegistrarCategoriaPage;
