import { Grid } from "@mantine/core";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { ListadoArticulos } from "../../Components/listados/ListadoArticulos";

const ListadoArticulosPage = () => {
  return (
    <AuthLayout title="Listado de usuarios">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ListadoArticulos />
        </Grid.Col>
      </Grid>
    </AuthLayout>
  );
};

export default ListadoArticulosPage;
