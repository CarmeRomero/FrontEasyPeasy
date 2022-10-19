import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { FC, useContext } from "react";
import { UiContext } from "../../context";
import { useUnoSolo } from "../../hooks/useUsuario";
import { Header, Presentation, Sidebar } from "../ui";
import { useEffect, useState } from "react";
import { IUsuario } from "../../interfaces/usuario";
import { SidebarAdmin } from "../ui/SidebarAdmin";
import { SidebarVISITANTE } from "../ui/SidebarVisitante";
import { SidebarMozo } from "../ui/SidebarMozo";
import { SidebarCajero } from "../ui/SidebarCajero";

// import { SidebarVISITANTE } from "../ui/SidebarVisitante";

interface Props {
  children?: React.ReactNode | undefined;
  title?: string;
}

export const DashboardLayout: FC<Props> = ({ children, title }) => {
  const [usuario, setUsuario] = useState<IUsuario>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsuario(JSON.parse(localStorage.getItem("usuario") || ""));
    }
  }, []);

  console.log(usuario);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        {usuario && usuario.rol == "ADMIN" ? (
          <SidebarAdmin />
        ) : usuario && usuario.rol == "VISITANTE" ? (
          <SidebarVISITANTE />
        ) : usuario && usuario.rol == "MOZO" ? (
          <SidebarMozo />
        ) : (
          <SidebarCajero />
        )}
        <Box
          sx={{
            backgroundColor: "white",
            flex: 1,
          }}
          id="main-content"
        >
          <Header />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              minHeight: "min-content",
              margin: "52px 52px",
            }}
          >
            <Grid>
              <Grid.Col md={12}>
                <Title mt="md" order={1} align="center">
                  {title}
                </Title>
              </Grid.Col>
              <Grid.Col md={12}>
                <Box sx={{ width: "100%", maxWidth: "900px" }}>{children}</Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
