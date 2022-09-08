import { Box } from "@mantine/core";
import { FC } from "react";

interface Props {
  title: string;
}

export const Presentation: FC<Props> = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "200px",
        backgroundColor: "#1a73e8",
        width: "100%",
        minHeight: "auto",
        backgroundImage: "url(/img/illustration.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 400px",

        // backgroundImage: "url(/img/grupo_amarillo.svg)",
      }}
    ></Box>
  );
};
