import { Grid } from "@mantine/core";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { ListadoUsuarios } from "../../Components/listados/ListadoUsuarios";

const ListadoUsuariosPage = () => {
  return (
    <AuthLayout title="Listado de usuarios">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ListadoUsuarios />
        </Grid.Col>
      </Grid>
    </AuthLayout>
  );
};

export default ListadoUsuariosPage;
