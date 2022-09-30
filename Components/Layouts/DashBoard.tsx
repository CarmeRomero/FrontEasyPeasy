import { Badge, Box, Button, Card, Group, Text } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { FC, useContext } from "react";
import { UiContext } from "../../context";
import { Header, Sidebar, Presentation } from "../ui";

interface Props {
  children?: React.ReactNode | undefined;
  title?: string;
}

export const DashboardLayout: FC<Props> = ({ children, title }) => {
  const { isNavCollapsed } = useContext(UiContext);

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
        <Sidebar />
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
            <Box sx={{ width: "100%", maxWidth: "900px" }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
