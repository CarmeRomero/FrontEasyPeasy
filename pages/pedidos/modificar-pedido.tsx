import { Grid } from "@mantine/core";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../Components/Layouts/DashBoard";
import { ModificarArticulosMozo } from "../../Components/listados/ModificarArticulosMozo";
import { Padre } from "../../Components/listados/Padre";
import { PedidoProvider } from "../../context/pedido/pedidoProvider";

const ModificarPedidoPage = () => {
  const { query } = useRouter();
  const idPedido = Number(query.idPedido as string);

  return (
    <DashboardLayout title="Editar Pedido">
      <PedidoProvider>
        <Grid columns={12}>
          <Grid.Col span={12}>
            <Padre idPedido={idPedido} />
            {/* <ModificarArticulosMozo idPedido={idPedido} /> */}
          </Grid.Col>
        </Grid>
      </PedidoProvider>
    </DashboardLayout>
  );
};

export default ModificarPedidoPage;
