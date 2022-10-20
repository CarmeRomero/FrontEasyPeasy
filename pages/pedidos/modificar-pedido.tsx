import { Grid } from "@mantine/core";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ModificarArticulosMozo } from "../../Components/listados/ModificarArticulosMozo";
import { PedidoProvider } from "../../context/pedido/pedidoProvider";

const ModificarPedidoPage = () => {
  const { query } = useRouter();
  const idPedido = Number(query.idPedido as string);

  return (
    <DashboardLayout title="Registrar Pedido">
      <PedidoProvider>
        <Grid columns={12}>
          <Grid.Col span={12}>
            <ModificarArticulosMozo idPedido={idPedido} />
          </Grid.Col>
        </Grid>
      </PedidoProvider>
    </DashboardLayout>
  );
};

export default ModificarPedidoPage;
