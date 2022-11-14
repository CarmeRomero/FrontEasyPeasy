import { Avatar, Box } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { FC, useContext } from "react";
import { UiContext } from "../../context";

interface Props {
  backgroundColor?: string;
}

export const Header: FC<Props> = ({ backgroundColor = "#081c34" }) => {
  const [scroll] = useWindowScroll();
  const { isNavCollapsed } = useContext(UiContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #5c5f66",
          display: "flex",
          justifyContent: "space-between",
          boxSizing: "border-box",
          height: "52px",

          padding: "0px 24px",
          position: "fixed",
          transform: "translateZ(0)",
          zIndex: 3,
          transition:
            "box-shadow .15s cubic-bezier(0.4, 0, 1, 1),background-color .15s cubic-bezier(0.4, 0, 1, 1)",
          width: `calc(100% - ${isNavCollapsed ? "256px" : "68px"})`,
          backgroundColor: "#081c34",
          // backgroundColor: `${scroll.y > 0 ? backgroundColor : "transparent"}`,
          boxShadow: `${
            scroll.y > 0
              ? "0px 1px 2px 0px rgb(60 64 67 / 30%), 0px 1px 3px 1px rgb(60 64 67 / 15%)"
              : "none"
          }`,
        }}
      >
        <Box sx={{ display: "flex", width: "100%", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              zIndex: 1,
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              zIndex: 1,
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Avatar radius="xl" sx={{ backgroundColor: "#081c34" }}>
              MK
            </Avatar>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
