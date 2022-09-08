import { Box, Center } from "@mantine/core";
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {children}
        </Box>
      </main>
    </>
  );
};
