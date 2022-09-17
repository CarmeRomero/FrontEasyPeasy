import { Grid } from "@mantine/core";
import { AuthLayout } from "../../components/layouts/AuthBoard";
import { ListadoUsuarios } from "../../components/listados/ListadoUsuarios";

const ListadoUsuariosPage = () => {
  return (
    <AuthLayout title="Registrar">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ListadoUsuarios />
        </Grid.Col>
      </Grid>
    </AuthLayout>
  );
};

export default ListadoUsuariosPage;
