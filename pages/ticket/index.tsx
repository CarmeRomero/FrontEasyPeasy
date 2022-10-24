import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { RegistrarTicket } from "../../Components/Formularios/registrarTicket";

const TicketsPage = () => {
  return (
    <DashboardLayout title="Home">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <RegistrarTicket />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default TicketsPage;
