import { Badge, Box, Button, Card, Group, Text } from "@mantine/core";
import Head from "next/head";
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
            backgroundColor: "#1a1b1e",
            // marginLeft: `${isNavCollapsed ? "256px" : "68px"}`,
            flex: 1,
            transition: "width .4s cubic-bezier(0.4, 0, 0.2, 1)",

            // "@media (max-width: 755px)": {
            //   marginLeft: "0px",
            // },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Header />
            {/* <Presentation title="Hola que tal"></Presentation> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                margin: "52px auto",
                width: "936px",
                minHeight: "min-content",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
