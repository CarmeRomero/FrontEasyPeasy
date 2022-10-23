import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ListadoArticulos } from "../../Components/listados/ListadoArticulos";

const ListadoArticulosPage = () => {
  return (
    <DashboardLayout title="Listado artículos">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ListadoArticulos />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default ListadoArticulosPage;
