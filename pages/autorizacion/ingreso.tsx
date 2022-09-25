import { NextPage } from "next";
import { AuthLayout } from "../../Components/Layouts/AuthBoard";
import { Button, Grid } from "@mantine/core";
import { FormularioIngreso } from "../../Components/Formularios/login";

const autorizacionPage: NextPage = () => {
  return (
    <AuthLayout title="Registrar">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <FormularioIngreso />
        </Grid.Col>
      </Grid>
    </AuthLayout>
  );
};

export default autorizacionPage;
