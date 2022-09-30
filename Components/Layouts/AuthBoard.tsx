import { Box, Center, SimpleGrid } from "@mantine/core";
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
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 2, spacing: "sm" },
          ]}
          my="md"
        >
          <Box
            sx={{
              // fontSize: "10px",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: "90vh",
              marginLeft: "80px",
              // marginLeft: 50,
            }}
          >
            {children}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            <img src="https://pymstatic.com/30549/conversions/tipos-de-cafe-thumb.jpg" />
          </Box>
        </SimpleGrid>
      </main>
    </>
  );
};
