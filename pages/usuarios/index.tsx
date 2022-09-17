import { Grid } from "@mantine/core";
import { AuthLayout } from "../../components/layouts/AuthBoard";
import { FormularioRegistrarUsuario } from "../../components/formularios/RegistrarUsuario";

const RegistrarUsuarioPage = () => {
  return (
    <AuthLayout title="Registrar">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <FormularioRegistrarUsuario />
        </Grid.Col>
      </Grid>
    </AuthLayout>
  );
};

export default RegistrarUsuarioPage;
