import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ListadoUsuarios } from "../../Components/listados/ListadoUsuarios";
import { Presentation } from "../../Components/ui";

const HomePage = () => {
  return (
    <DashboardLayout>
      <Grid columns={12}>
        <Grid.Col span={12}>
          <Presentation title="" />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default HomePage;
