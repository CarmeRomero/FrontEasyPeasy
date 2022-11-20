import { Grid } from "@mantine/core";
import Paperbase from "../Components/HeaderResponsive/paperbase";
import Dashboard from "../Components/Layouts/DashBoard";

const MiPage = () => {
  return (
    <Grid columns={12}>
      <Grid.Col span={12}>
        <Paperbase />
      </Grid.Col>
    </Grid>
  );
};

export default MiPage;
