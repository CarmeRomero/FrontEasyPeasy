import { Grid } from "@mantine/core";
import { FormularioIngreso } from "../Components/Formularios/login";
import { AuthLayout } from "../Components/Layouts/AuthBoard";

const Home = () => {
  <AuthLayout title="Ingreso">
    <Grid columns={12}>
      <Grid.Col span={12}>
        <FormularioIngreso />
      </Grid.Col>
    </Grid>
  </AuthLayout>;
};

export default Home;
