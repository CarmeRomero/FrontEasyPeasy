import { Grid } from "@mantine/core";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { FormularioRegistrarUsuario } from "../../Components/Formularios/registrarUsuario";

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
