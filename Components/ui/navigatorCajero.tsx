import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, Settings } from "tabler-icons-react";
import { NextLink } from "@mantine/next";
import TicketsPage from "../../pages/ticket";

const categories = [
  {
    id: "Principales",
    children: [
      {
        id: "Tickets",
        icon: <Settings />,
        path: "tickets",
        element: <TicketsPage />,
        active: true,
      },
      {
        id: "Caja",
        icon: <Settings />,
        path: "/reportes/cajero-uno",
        active: true,
      },
    ],
  },
  {
    id: "Perfil",
    children: [
      {
        id: "Mis datos",
        icon: <Settings />,
        path: "/usuarios/datos-usuario",
        active: true,
      },
      { id: "Cerrar sesión", icon: <Settings />, active: true },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function NavigatorCajero(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#e57373",
            justifyContent: "center",
          }}
        >
          Easy Peasy
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText>Página principal</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
