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

  return (
    <>
      <Grid>
        <Grid.Col md={12}>
          <Head>
            {/* <Title order={1}>{title}</Title> */}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
            />
          </Head>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "yellow",
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
                backgroundColor: "#FFFFFF",
                flex: 1,
              }}
              id="main-content"
            >
              <Header />

              <Title
                mx={30}
                mt={55}
                order={2}
                style={
                  {
                    // color: "red",
                    // padding: "15px",
                    // border: "0.5px solid rgb(204, 199, 219)",
                    // borderRadius: "9px",
                    // backgroundColor: "#F4FFE8",
                  }
                }
                align="center"
              >
                {title}
              </Title>

              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  minHeight: "min-content",
                  width: "90%",
                  margin: "20px 50px",
                }}
              >
                <Box sx={{ width: "100%" }}>{children}</Box>
              </Box>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
};
