import { Grid } from "@mantine/core";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { FormularioRegistrarArticulo } from "../../Components/Formularios/registrarArticulo";

const RegistrarArticuloPage = () => {
  return (
    <AuthLayout title="Registrar Artículo">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <FormularioRegistrarArticulo />
        </Grid.Col>
      </Grid>
    </AuthLayout>
  );
};

export default RegistrarArticuloPage;
