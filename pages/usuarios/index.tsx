import { Grid } from "@mantine/core";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ListadoUsuarios } from "../../Components/listados/ListadoUsuarios";

const HomePage = () => {
  return (
    <DashboardLayout title="Home">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <img
            src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2019%2F01%2F08%2Fcoffee-espresso-hero-unsplash-2000.jpg&w=380&h=254&c=sc&poi=face&q=60"
            alt=""
          />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default HomePage;
