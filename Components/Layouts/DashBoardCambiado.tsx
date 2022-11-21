export const a = () => {};
// import {
//   Badge,
//   Box,
//   Button,
//   Card,
//   Grid,
//   Group,
//   Text,
//   Title,
// } from "@mantine/core";
// import Head from "next/head";
// import Image from "next/image";
// import { FC, useContext } from "react";
// import { UiContext } from "../../context";
// import { useUnoSolo } from "../../hooks/useUsuario";
// import { Header, Presentation, Sidebar } from "../ui";
// import { useEffect, useState } from "react";
// import { IUsuario } from "../../interfaces/usuario";
// import { SidebarAdmin } from "../ui/SidebarAdmin";
// import { SidebarVISITANTE } from "../ui/SidebarVisitante";
// import { SidebarMozo } from "../ui/SidebarMozo";
// import { SidebarCajero } from "../ui/SidebarCajero";

// interface Props {
//   children?: React.ReactNode | undefined;
//   title?: string;
// }

// export const DashboardLayout: FC<Props> = ({ children, title }) => {
//   const [usuario, setUsuario] = useState<IUsuario>();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setUsuario(JSON.parse(localStorage.getItem("usuario") || ""));
//     }
//   }, []);

//   return (
//     <>
//       <Grid>
//         <Grid.Col md={12}>
//           <Head>
//             <Title order={1}>{title}</Title>
//             <meta
//               name="viewport"
//               content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
//             />
//           </Head>
//           <Box
//             sx={{
//               display: "flex",
//               width: "100%",
//             }}
//           >
//             {usuario && usuario.rol == "ADMIN" ? (
//               <SidebarAdmin />
//             ) : usuario && usuario.rol == "VISITANTE" ? (
//               <SidebarVISITANTE />
//             ) : usuario && usuario.rol == "MOZO" ? (
//               <SidebarMozo />
//             ) : (
//               <SidebarCajero />
//             )}
//             <Box
//               sx={{
//                 backgroundColor: "#FFFFFF",
//                 flex: 1,
//               }}
//               id="main-content"
//             >
//               <Header />

//               <Title
//                 mx={30}
//                 mt={55}
//                 order={2}
//                 style={{
//                   color: "rgb(80, 77, 89)",
//                   padding: "15px",
//                   border: "0.5px solid rgb(204, 199, 219)",
//                   borderRadius: "9px",
//                   backgroundColor: "#F4FFE8",
//                 }}
//                 align="center"
//               >
//                 {title}
//               </Title>

//               <Box
//                 sx={{
//                   display: "flex",
//                   flex: 1,
//                   justifyContent: "center",
//                   minHeight: "min-content",
//                   width: "100%",
//                   margin: "20px 65px",
//                 }}
//               >
//                 <Box sx={{ width: "100%" }}>{children}</Box>
//               </Box>
//             </Box>
//           </Box>
//         </Grid.Col>
//       </Grid>
//     </>
//   );
// };

// // import * as React from "react";
// // import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// // import CssBaseline from "@mui/material/CssBaseline";
// // import MuiDrawer from "@mui/material/Drawer";
// // import Box from "@mui/material/Box";
// // import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// // import Toolbar from "@mui/material/Toolbar";
// // import List from "@mui/material/List";
// // import Typography from "@mui/material/Typography";
// // import Divider from "@mui/material/Divider";
// // import IconButton from "@mui/material/IconButton";
// // import Badge from "@mui/material/Badge";
// // import Container from "@mui/material/Container";
// // import Grid from "@mui/material/Grid";
// // import Paper from "@mui/material/Paper";
// // import Link from "@mui/material/Link";
// // // import MenuIcon from "@mui/icons-material/Menu";
// // import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// // import { Menu, Notification } from "tabler-icons-react";
// // import {
// //   mainListItems,
// //   secondaryListItems,
// // } from "../HeaderResponsive/listItems";
// // // import NotificationsIcon from "@mui/icons-material/Notifications";

// // // import Chart from "./Chart";
// // // import Deposits from "./Deposits";
// // // import Orders from "./Orders";

// // function Copyright(props: any) {
// //   return (
// //     <Typography
// //       variant="body2"
// //       color="text.secondary"
// //       align="center"
// //       {...props}
// //     >
// //       {"Copyright © "}
// //       <Link color="inherit" href="https://mui.com/">
// //         Your Website
// //       </Link>{" "}
// //       {new Date().getFullYear()}
// //       {"."}
// //     </Typography>
// //   );
// // }

// // const drawerWidth: number = 240;

// // interface AppBarProps extends MuiAppBarProps {
// //   open?: boolean;
// // }

// // const AppBar = styled(MuiAppBar, {
// //   shouldForwardProp: (prop) => prop !== "open",
// // })<AppBarProps>(({ theme, open }) => ({
// //   zIndex: theme.zIndex.drawer + 1,
// //   transition: theme.transitions.create(["width", "margin"], {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   ...(open && {
// //     marginLeft: drawerWidth,
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     transition: theme.transitions.create(["width", "margin"], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen,
// //     }),
// //   }),
// // }));

// // const Drawer = styled(MuiDrawer, {
// //   shouldForwardProp: (prop) => prop !== "open",
// // })(({ theme, open }) => ({
// //   "& .MuiDrawer-paper": {
// //     position: "relative",
// //     whiteSpace: "nowrap",
// //     width: drawerWidth,
// //     transition: theme.transitions.create("width", {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen,
// //     }),
// //     boxSizing: "border-box",
// //     ...(!open && {
// //       overflowX: "hidden",
// //       transition: theme.transitions.create("width", {
// //         easing: theme.transitions.easing.sharp,
// //         duration: theme.transitions.duration.leavingScreen,
// //       }),
// //       width: theme.spacing(7),
// //       [theme.breakpoints.up("sm")]: {
// //         width: theme.spacing(9),
// //       },
// //     }),
// //   },
// // }));

// // const mdTheme = createTheme();

// // function DashboardContent() {
// //   const [open, setOpen] = React.useState(true);
// //   const toggleDrawer = () => {
// //     setOpen(!open);
// //   };

// //   return (
// //     <ThemeProvider theme={mdTheme}>
// //       <Box sx={{ display: "flex" }}>
// //         <CssBaseline />
// //         <AppBar position="absolute" open={open}>
// //           <Toolbar
// //             sx={{
// //               pr: "24px", // keep right padding when drawer closed
// //             }}
// //           >
// //             <IconButton
// //               edge="start"
// //               color="inherit"
// //               aria-label="open drawer"
// //               onClick={toggleDrawer}
// //               sx={{
// //                 marginRight: "36px",
// //                 ...(open && { display: "none" }),
// //               }}
// //             >
// //               <Menu />
// //             </IconButton>
// //             <Typography
// //               component="h1"
// //               variant="h6"
// //               color="inherit"
// //               noWrap
// //               sx={{ flexGrow: 1 }}
// //             >
// //               Dashboard
// //             </Typography>
// //             <IconButton color="inherit">
// //               <Badge badgeContent={4} color="secondary">
// //                 <Notification />
// //               </Badge>
// //             </IconButton>
// //           </Toolbar>
// //         </AppBar>
// //         <Drawer variant="permanent" open={open}>
// //           <Toolbar
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "flex-end",
// //               px: [1],
// //             }}
// //           >
// //             <IconButton onClick={toggleDrawer}>
// //               <ChevronLeftIcon />
// //             </IconButton>
// //           </Toolbar>
// //           <Divider />
// //           <List component="nav">
// //             {mainListItems}
// //             <Divider sx={{ my: 1 }} />
// //             {secondaryListItems}
// //           </List>
// //         </Drawer>
// //         <Box
// //           component="main"
// //           sx={{
// //             backgroundColor: (theme) =>
// //               theme.palette.mode === "light"
// //                 ? theme.palette.grey[100]
// //                 : theme.palette.grey[900],
// //             flexGrow: 1,
// //             height: "100vh",
// //             overflow: "auto",
// //           }}
// //         >
// //           <Toolbar />
// //           <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// //             <Grid container spacing={3}>
// //               {/* Chart */}
// //               <Grid item xs={12} md={8} lg={9}>
// //                 <Paper
// //                   sx={{
// //                     p: 2,
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     height: 240,
// //                   }}
// //                 >
// //                   {/* <Chart /> */}
// //                 </Paper>
// //               </Grid>
// //               {/* Recent Deposits */}
// //               <Grid item xs={12} md={4} lg={3}>
// //                 <Paper
// //                   sx={{
// //                     p: 2,
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     height: 240,
// //                   }}
// //                 >
// //                   {/* <Deposits /> */}
// //                 </Paper>
// //               </Grid>
// //               {/* Recent Orders */}
// //               <Grid item xs={12}>
// //                 <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
// //                   {/* <Orders /> */}
// //                 </Paper>
// //               </Grid>
// //             </Grid>
// //             <Copyright sx={{ pt: 4 }} />
// //           </Container>
// //         </Box>
// //       </Box>
// //     </ThemeProvider>
// //   );
// // }

// // export default function Dashboard() {
// //   return <DashboardContent />;
// // }
