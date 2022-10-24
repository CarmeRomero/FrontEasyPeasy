import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

export const Mesa = () => {
  const [mesas, setMesas] = useState([
    {
      nombre: "mesa 1",
      estilos: { width: 200, height: 100, x: 100, y: 100 },
    },
    {
      nombre: "mesa 2",
      estilos: { width: 200, height: 100, x: 400, y: 100 },
    },
  ]);

  useEffect(() => {}, [mesas]);

  const renderMesas = mesas.map((mesa, index) => (
    <Rnd
      bounds="parent"
      style={{
        background: "#366fc9",
        padding: "20px",
        border: "1px solid black",
        borderRadius: "5px",
      }}
      default={{
        ...mesa.estilos,
      }}
    >
      {mesa.nombre}
    </Rnd>
  ));

  const handleClick = () => {
    setMesas([
      ...mesas,
      {
        nombre: "mesa x",
        estilos: { width: 200, height: 100, x: 100, y: 100 },
      },
    ]);
    console.log(mesas);
  };

  return (
    <>
      <Button my="sm" onClick={handleClick}>
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
    </>
  );
};
