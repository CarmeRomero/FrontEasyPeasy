import { Grid } from "@mantine/core";
import { NavbarNested } from "../Components/Layouts/sideBar";

const MiPage = () => {
  return (
    <Grid columns={12}>
      <Grid.Col span={12}>
        <NavbarNested />
      </Grid.Col>
    </Grid>
  );
};

export default MiPage;
