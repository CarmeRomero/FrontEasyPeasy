import { Box, Center, Grid } from "@mantine/core";
import { sliderClasses } from "@mui/material";
import { Color } from "ag-grid-community";
import Head from "next/head";
import { FC } from "react";
import img from "../../img/img1.png";
interface Props {
  children?: React.ReactNode | undefined;
  title?: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>{/* <title>{title}</title> */}</Head>

      <main>
        <Grid>
          <Grid.Col md={12}>
            <Box
              sx={{
                // fontSize: "10px",
                display: "flex",

                // justifyContent: "left",
                justifyContent: "center",
                // backgroundImage: `url(${img})`,
                backgroundImage: `url(https://cdn.pixabay.com/photo/2022/04/10/15/20/yellow-background-7123585_960_720.jpg)`,

                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                opacity: 1,
                alignItems: "center",
                height: "600px",

                minWidth: "500vm",
                minHeight: "500vm",

                // marginLeft: "30px",
                // marginLeft: 50,
              }}
            >
              {children}
            </Box>
          </Grid.Col>
        </Grid>

        {/* <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            <img src="https://pymstatic.com/30549/conversions/tipos-de-cafe-thumb.jpg" />
          </Box> */}
      </main>
    </>
  );
};
