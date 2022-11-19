import { Grid } from "@mantine/core";
import { HeaderResponsive } from "../Components/HeaderResponsive/HeaderResponsive";

const MiPage = () => {
  return (
    <Grid columns={12}>
      <Grid.Col span={12}>
        <HeaderResponsive
          links={[
            { link: "/autorizacion/ingreso", label: "ingreso" },
            { link: "/autorizacion", label: "ingreso" },
            { link: "/autorizacion", label: "ingreso" },
            { link: "/autorizacion", label: "ingreso" },
          ]}
        />
      </Grid.Col>
    </Grid>
  );
};

export default MiPage;
