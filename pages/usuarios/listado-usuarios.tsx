import { Grid } from "@mantine/core";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ListadoUsuarios } from "../../Components/listados/ListadoUsuarios";

const ListadoUsuariosPage = () => {
  return (
    <DashboardLayout title="Listado de usuarios">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ListadoUsuarios />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default ListadoUsuariosPage;
