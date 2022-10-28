import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useMesas } from "../hooks/useMesas";
import { RegistrarMesa } from "./Formularios/RegistrarMesa";

export const Diagrama = () => {
  const [open, setOpen] = useState(false);
  const [mesas, setMesas] = useState([
    // {
    //   nombre: "mesa 1",
    //   estilos: { width: 200, height: 100, x: 100, y: 100 },
    // },
    // {
    //   nombre: "mesa 2",
    //   estilos: { width: 200, height: 100, x: 400, y: 100 },
    // },
  ]);

  const { data, refetch } = useMesas();

  useEffect(() => {
    if (data) {
      const mesasBase = data.map(
        ({ color, height, id, num_mesa, width, x, y }: any) => {
          return {
            id,
            num_mesa,
            estilos: { width, height, x, y, background: color },
          };
        }
      );
      // Usuarios: null
      // color: "#a1e6b3"
      // estado: "LIBRE"
      // height: 100
      // id: 6
      // id_usuario: null
      // num_mesa: 1
      // ubicacion: "ADENTRO"
      // width: 100
      // x: 20
      // y: 50
      console.log(data);
      setMesas(mesasBase);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const arrastrar = (d: any) => {
    console.log(d);
  };

  const renderMesas = mesas.map((mesa: any) => (
    <Rnd
      bounds="parent"
      style={{
        background: mesa.estilos.background,
        padding: "20px",
        border: "1px solid black",
        borderRadius: "5px",
      }}
      onDragStop={(e, d) => {
        arrastrar(d);
      }}
      default={{
        ...mesa.estilos,
      }}
    >
      {mesa.nombre}
    </Rnd>
  ));

  // const handleClick = () => {
  //   setMesas([
  //     ...mesas,
  //     {
  //       nombre: "mesa x",
  //       estilos: { width: 200, height: 100, x: 100, y: 100 },
  //     },
  //   ]);
  //   console.log(mesas);
  // };

  const handleClickGuardar = () => {
    console.log(mesas);
  };

  return (
    <>
      <RegistrarMesa open={open} setOpen={setOpen} />
      <Button my="sm" onClick={() => setOpen(true)}>
        Agregar mesa
      </Button>
      <div
        style={{
          width: "100%",
          minWidth: "600px",
          height: "400px",
          border: "1px solid black",
        }}
      >
        {renderMesas}
      </div>
      <Button my="sm" onClick={handleClickGuardar}>
        Guardar diagrama
      </Button>
    </>
  );
};
