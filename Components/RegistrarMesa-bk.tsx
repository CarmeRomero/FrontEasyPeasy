import { Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { useMutateIntercambiarLugares } from "../hooks/useCaja";
// import { useLugares } from "../hooks/useDeposito";
// import { IIntercambioLugares } from "../interfaces/intercambio-lugares";
// import { ILugar } from "../interfaces/lugar";

interface IProps {
  nombrePlano: string;
  filas: number;
  columnas: number;
}

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "white",
});

export const RegistrarMesa = ({ nombrePlano, filas, columnas }: IProps) => {
  // const [lugares, setLugares] = useState<ILugar[]>([] as ILugar[]);

  // const { mutate } = useMutateIntercambiarLugares();

  // const { data, refetch } = useLugares(nombreEstanteria);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     setLugares(data);
  //   }
  // }, [data]);

  // const handleDragEnd = (result: any) => {
  //   const { source: origen, destination: destino } = result;

  //   if (!destino) return;
  //   if (destino.index === origen.index) return;
  //   if (destino.droppableId === origen.droppableId) return;

  //   const lugarOrigen = origen.droppableId;
  //   const lugarDestino = destino.droppableId;

  //   const cajaOrigen = lugares.filter((lugar) => lugar.id === lugarOrigen);
  //   const cajaDestino = lugares.filter((lugar) => lugar.id === lugarDestino);

  //   const intercambio: IIntercambioLugares = {
  //     origen: {
  //       idLugar: lugarOrigen,
  //       idCaja: cajaOrigen[0].caja?.id,
  //     },
  //     destino: {
  //       idLugar: lugarDestino,
  //       idCaja: cajaDestino[0].caja?.id,
  //     },
  //   };

  //   console.log(intercambio);

  //   mutate(intercambio, {
  //     onSuccess: () => {
  //       refetch();
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   });
  // };

  const handleClick = (e: any) => {
    console.log(e);
  };

  // <DragDropContext onDragEnd=x{handleDragEnd}>
  return (
    <DragDropContext
      onDragEnd={() => {
        console.log("se movio");
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(250, 211, 192)",
        }}
        pb={10}
        mx={5}
      >
        {Array.from(Array(filas)).map((_, i) => {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              m={1}
            >
              {Array.from(Array(columnas)).map((_, j) => {
                // const lugar = lugares[(filas - 1 - i) * columnas + j]
                //   ? lugares[(filas - 1 - i) * columnas + j]
                //   : { id: "123", ubicacion: 1, caja: null };

                {
                  /* <Droppable droppableId={lugar.id} key={i + j}> */
                }
                return (
                  <Droppable droppableId={`${i} + ${j}`} key={i + j}>
                    {(droppableProvided, snapshot) => (
                      <Box
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        mt={1}
                        ml={2}
                        p={1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgba(255, 255, 255)",
                          width: "60px",
                          height: "40px",
                          border: "1px solid black",
                          position: "relative",
                        }}
                      >
                        {/* label with number positioned top-right */}

                        {/* {lugar.caja && ( */}
                        <Draggable
                          key={`${i} + ${j}`}
                          draggableId={`${i} + ${j}`}
                          index={Number(`${i} + ${j}`)}
                        >
                          {(draggableProvided) => (
                            <Box
                              key={`${i} + ${j}`}
                              {...draggableProvided.draggableProps}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.dragHandleProps}
                              m={2}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minWidth: "40px",
                                minHeight: "20px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                backgroundColor: "#fff",
                                boxShadow:
                                  "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
                                "&:hover": {
                                  backgroundColor: "#f5f5f5",
                                },
                              }}
                              onClick={(e: any) => handleClick(e)}
                            >
                              {/* <Box sx={{ color: "black" }}>{"ninguno"}</Box> */}
                            </Box>
                          )}
                        </Draggable>
                        {droppableProvided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </DragDropContext>
  );
};
