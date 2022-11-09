import { Badge, Box, Tooltip } from "@mantine/core";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useMesas, useMutateModificarMesa } from "../hooks/useMesas";
import { useUnoSolo, useUsuarios } from "../hooks/useUsuario";

export const DiagramaMozo = () => {
  const [open, setOpen] = useState(false);

  const [mesas, setMesas] = useState([]);

  const { data, refetch } = useMesas();

  const { data: yo } = useUnoSolo();

  useEffect(() => {
    if (data) {
      const mesasBase = data.map(
        ({ color, height, id, num_mesa, width, x, y, ...mas }: any) => {
          return {
            ...mas,
            id,
            num_mesa,
            estilos: { width, height, x, y, background: color },
          };
        }
      );
      setMesas(mesasBase);
    }
    console.log(data);
  }, [data]);

  const handleClick = (mesa: any, index: any) => {
    console.log(mesa, index);
  };

  // const renderMesas = mesas.map((mesa: any, index) => (
  //   <>
  //     <Box
  //       key={index}
  //       // bounds="parent"
  //       // position={{  }}
  //       style={{
  //         position: "relative",
  //         left: mesa.estilos.x,
  //         top: mesa.estilos.y,
  //         background: mesa.estilos.background,
  //         width: mesa.estilos.width,
  //         height: mesa.estilos.height,
  //         padding: "20px",
  //         border: "1px solid black",
  //         borderRadius: "5px",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //       // onClick={() => handleClick(mesa, index)}
  //       // default={{
  //       //   ...mesa.estilos,
  //       // }}
  //     >
  //       <Tooltip
  //         label={
  //           mesa.Usuarios != undefined
  //             ? `Ocupada por: ${mesa.Usuarios?.nombre}`
  //             : `Mesa libre`
  //         }
  //         withArrow
  //       >
  //         <Box
  //           sx={{
  //             border: "1px solid black",
  //             borderRadius: "50px",
  //             height: "30px",
  //             width: "30px",
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             color: "white",
  //             backgroundColor:
  //               mesa.id_usuario == yo.id
  //                 ? "black"
  //                 : mesa.id_usuario == null
  //                 ? "orange"
  //                 : "red",
  //           }}
  //         >
  //           {/* {`${mesa.id} - ${yo.id}`} */}
  //           {mesa.num_mesa}
  //         </Box>
  //       </Tooltip>
  //       {/* <Badge color="green" variant="filled">
  //         {mesa.estado}
  //       </Badge> */}
  //     </Box>
  //   </>
  // ));

  console.log(mesas);
  return (
    <>
      <div
        style={{
          width: "1000px",
          display: "absolute",
          // minWidth: "600px",
          height: "400px",
          border: "1px solid black",
        }}
      >
        {mesas.map((mesa: any, index) => (
          <div
            style={{
              position: "absolute",
            }}
          >
            <Box
              key={index}
              // bounds="parent"
              // position={{  }}
              style={{
                position: "relative",
                left: mesa.estilos.x,
                top: mesa.estilos.y,
                background: mesa.estilos.background,
                width: mesa.estilos.width,
                height: mesa.estilos.height,
                padding: "20px",
                border: "1px solid black",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              // onClick={() => handleClick(mesa, index)}
              // default={{
              //   ...mesa.estilos,
              // }}
            >
              <Tooltip
                label={
                  mesa.id_usuario == yo.id
                    ? `Atendida por: ${mesa.Usuarios?.nombre}`
                    : mesa.Usuarios == undefined
                    ? `Mesa libre`
                    : `Atendida por: ${mesa.Usuarios?.nombre}`
                }
                withArrow
              >
                <Box
                  sx={{
                    border: "1px solid black",
                    borderRadius: "50px",
                    height: "30px",
                    width: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    backgroundColor:
                      mesa.id_usuario == yo.id
                        ? "black"
                        : mesa.id_usuario == null
                        ? "orange"
                        : "red",
                  }}
                >
                  {/* {`${mesa.id} - ${yo.id}`} */}
                  {mesa.num_mesa}
                </Box>
              </Tooltip>
              {/* <Badge color="green" variant="filled">
                  {mesa.estado}
                </Badge> */}
            </Box>
          </div>
        ))}
        {/* {renderMesas} */}
      </div>
    </>
  );
};
