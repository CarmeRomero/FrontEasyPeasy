import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { Grid } from "@mantine/core";
import { ListadoTickets } from "../../Components/listados/ListadoTickets";

const TicketsPage = () => {
  return (
    <DashboardLayout title="Generar ticket">
      <Grid columns={12}>
        <Grid.Col span={12}>
          <ListadoTickets />
        </Grid.Col>
      </Grid>
    </DashboardLayout>
  );
};

export default TicketsPage;
