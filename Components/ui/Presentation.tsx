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
        backgroundColor: "black",
        width: "100%",
        minHeight: "auto",
        backgroundImage:
          "url(https://i.pinimg.com/236x/3d/8b/e8/3d8be817b8a1b70452890e02c8279d1f.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 400px",

        // backgroundImage: "url(/img/grupo_amarillo.svg)",
      }}
    ></Box>
  );
};
