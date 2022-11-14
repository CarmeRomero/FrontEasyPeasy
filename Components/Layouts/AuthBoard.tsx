import { Box, Center, Grid } from "@mantine/core";
import { Color } from "ag-grid-community";
import Head from "next/head";
import { FC } from "react";

interface Props {
  children?: React.ReactNode | undefined;
  title?: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Grid>
          <Grid.Col md={12}>
            <Box
              sx={{
                // fontSize: "10px",
                display: "flex",

                // justifyContent: "left",
                justifyContent: "center",
                backgroundImage:
                  "url(https://www.pointbleudesign.com/wp-content/uploads/2019/09/European-Specialty-Coffee-Market-by-Pointbleu-Design-Blog.jpg )",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                opacity: 0.8,
                alignItems: "center",
                height: "610px",

                // width: "100vm",

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
