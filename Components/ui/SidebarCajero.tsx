import { Box, CSSObject, MediaQuery, Text } from "@mantine/core";
import Image from "next/image";
import { FC, useContext, useState } from "react";
import {
  ChevronUp,
  Users,
  ChevronLeft,
  BuildingSkyscraper,
  ListDetails,
  Box as Caja,
  Brackets,
} from "tabler-icons-react";
import { UiContext } from "../../context";
import NextLink from "next/link";
import { useMutateLogout } from "../../hooks/useAutorizacion";
import { useUnoSolo, useUsuarios } from "../../hooks/useUsuario";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode | undefined;
}
interface PropsContainer {
  children?: React.ReactNode | undefined;
}

interface Section {
  name: string;
  items: Item[];
}

// type IconType = (props: IconProps) => JSX.Element;
interface Item {
  name: string;
  icon: JSX.Element;
  path: string;
}

const shadowNav: CSSObject = {
  backgroundColor: "rgba(0,0,0,.4)",
  flex: 1,
};

export const SidebarCajero = () => {
  const { isNavCollapsed, toggleNavMenu } = useContext(UiContext);
  const { mutate: algo } = useMutateLogout();

  const sections: Section[] = [
    {
      name: "Usuarios",
      items: [
        {
          name: "Mis datos",
          icon: (
            <BuildingSkyscraper
              strokeWidth={2}
              color={"rgba(255,255,255,.8)"}
              style={{
                fontSize: "20px",
                height: "20px",
                lineHeight: "20px",
                width: "20px",
                minWidth: "20px",
              }}
            />
          ),
          path: "/usuarios/datos-usuario",
        },
      ],
    },

    {
      name: "Cerrar Sesión",
      items: [
        {
          name: "Cerrar Sesión",
          icon: (
            <BuildingSkyscraper
              strokeWidth={2}
              color={"rgba(255,255,255,.8)"}
              style={{
                fontSize: "20px",
                height: "20px",
                lineHeight: "20px",
                width: "20px",
                minWidth: "20px",
              }}
            />
          ),
          path: "/autorizacion/ingreso",
        },
      ],
    },
  ];

  const btnCollapseNav: CSSObject[] = [
    {
      flexGrow: 1,
      flexShrink: 0,
      justifyContent: "center",
    },
  ];

  return (
    <NavContainer>
      <NavHeader />
      <NavContent>
        {sections.map((section) => (
          <NavSection
            key={section.name}
            name={section.name}
            items={section.items}
          />
        ))}
      </NavContent>
      <Box
        sx={[
          {
            backgroundColor: "transparent",
            border: "0",
            cursor: "pointer",
            display: "flex",
            flex: "none",
            height: "44px",
            padding: "10px 24px",
            overflowX: "hidden",
            borderTop: isNavCollapsed ? "1px solid #5c5f66" : "",
            position: "relative",
          },
          ...(!isNavCollapsed ? btnCollapseNav : []),
        ]}
        onClick={() => toggleNavMenu()}
      >
        <ChevronLeft
          size={20}
          strokeWidth={2}
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            position: "absolute",
            right: "22px",
            top: "10px",
            transition:
              "transform .3s cubic-bezier(0.4, 0, 0.2, 1),color .1s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `rotate(${isNavCollapsed ? 0 : 180}deg)`,
          }}
        />
      </Box>
    </NavContainer>
  );
};

const NavContainer: FC<PropsContainer> = ({ children }) => {
  const { isNavCollapsed } = useContext(UiContext);

  console.log(isNavCollapsed);
  return (
    <Box
      sx={{
        backgroundAttachment: "fixed",
        minHeight: "100vh",

        backgroundImage: "url(/img/bk-nav.png)",
        backgroundPosition: "left 0 bottom 0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "256px 556px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#081c34",
        width: `${isNavCollapsed ? "256px" : "68px"}`,
        height: "100%",
        overflowY: "auto",
        transition: "width .3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "sticky",
        top: 0,
      }}
    >
      {children}
    </Box>
  );
};

const NavHeader = () => {
  const { isNavCollapsed } = useContext(UiContext);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "transparent",
          width: "100%",
          height: "52px",
          borderBottom: "1px solid #5c5f66",
          alignItems: "center",
          display: "flex",
          padding: "0 20px",
        }}
      >
        <Image
          src="/img/logo-mini.png"
          height={28}
          width={28}
          // style={{ position: "relative", top: "-1px" }}
        />
        {isNavCollapsed && (
          <Text
            size="lg"
            ml={12}
            weight={700}
            sx={{ letterSpacing: "1px", color: "pink" }}
          >
            EASY PEASY
          </Text>
        )}
      </Box>
    </>
  );
};

const NavContent: FC<PropsContainer> = ({ children }) => {
  const { isNavCollapsed } = useContext(UiContext);

  return (
    <>
      <Box
        sx={{
          flexGrow: isNavCollapsed ? 1 : 0,
          overflowX: "hidden",
          overflowY: "auto",
          overscrollBehavior: "none",
        }}
      >
        {children}
      </Box>
    </>
  );
};

const NavSection: FC<Section> = ({ name, items }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isNavCollapsed } = useContext(UiContext);

  return (
    <Box
      sx={{
        borderBottom: isNavCollapsed ? "1px solid #5c5f66" : "",
        backgroundColor: `${open ? "rgba(71,98,130,.2)" : "transparent"}`,
      }}
    >
      {isNavCollapsed && (
        <Box
          sx={{
            backgroundColor: `${open ? "rgba(71,98,130,.2)" : "transparent"}`,
            width: "100%",
            padding: `${open ? "20px 24px 0px" : "20px 24px"}`,
            position: "relative",
            cursor: "pointer",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,.15)",
            },
          }}
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Box
            sx={{
              color: "white",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "20px",
              marginBottom: "2px",
            }}
          >
            {name}
          </Box>
          <Box
            sx={{
              "&:hover": {
                opacity: `${open ? 1 : 0}`,
              },
            }}
          >
            <ChevronUp
              size={20}
              strokeWidth={2}
              color={"rgba(255,255,255,.8)"}
              style={{
                right: "8px",
                top: "20px",
                position: "absolute",
                opacity: `${open && isHovered ? 1 : 0}`,
                transition:
                  "opacity .3s cubic-bezier(0.4, 0, 0.2, 1),transform .3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: `rotate(${open ? 0 : 180}deg)`,
              }}
            />
          </Box>
          <Box
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              opacity: `${open ? 0 : 1}`,
              transition: "opacity .15s cubic-bezier(0.4, 0, 0.2, 1)",
              fontSize: "12px",
              textOverflow: "ellipsis",
              lineHeight: "16px",
              fontWeight: 400,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {name} {name} {name} {name} {name}
          </Box>
        </Box>
      )}
      {open && (
        <Box
          sx={{
            backgroundColor: "rgba(71,98,130,.2)",
            color: "rgba(255, 255, 255, 0.5)",
            padding: isNavCollapsed ? "0px 0px 16px" : "6px 0px",
          }}
        >
          {items.map((item) => (
            <Box
              key={item.name}
              sx={{
                backgroundColor: "transparent",
                border: 0,
                cursor: "pointer",
                display: "block",
                letterSpacing: ".25px",
                maxWidth: "100%",
                position: "relative",
                textAlign: "left",
                transition: "background-color .15s ease",
              }}
            >
              <NextLink href={item.path}>
                <Box
                  id="anchor"
                  sx={{
                    alignItems: "center",
                    color: "rgba(255, 255, 255, 0.8)",
                    display: "flex",
                    textDecoration: "none",
                    transition: "background-color .15s ease",
                    height: "32px",
                    padding: "0 24px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 500,

                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,.08)",
                    },
                  }}
                >
                  {/* <BuildingSkyscraper
                    strokeWidth={2}
                    color={"rgba(255,255,255,.8)"}
                    style={{
                      fontSize: "20px",
                      height: "20px",
                      lineHeight: "20px",
                      width: "20px",
                      minWidth: "20px",
                    }}
                  /> */}
                  {item.icon}
                  <Box
                    sx={{
                      marginLeft: "16px",
                      transition: "opacity .3s cubic-bezier(0.4, 0, 0.2, 1)",
                      whiteSpace: "nowrap",
                      opacity: isNavCollapsed ? 1 : 0,
                    }}
                  >
                    {item.name}
                  </Box>
                </Box>
              </NextLink>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
