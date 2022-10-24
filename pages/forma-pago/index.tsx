import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { RegistrarFormaPago } from "../../Components/Formularios/registrarFormaPago";

const FormaPagoPage = () => {
  return (
    <DashboardLayout title="Generar ticket">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <RegistrarFormaPago />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default FormaPagoPage;
