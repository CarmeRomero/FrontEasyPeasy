import { Grid } from "@mantine/core";
import { FormularioDatosUsuario } from "../../Components/Formularios/misDatos";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";

const MisDatosPage = () => {
  return (
    <AuthLayout title="Mis datos">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <FormularioDatosUsuario />
        </Grid.Col>
      </Grid>
    </AuthLayout>
  );
};

export default MisDatosPage;
