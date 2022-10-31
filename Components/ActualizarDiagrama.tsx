import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useMesas, useMutateModificarMesa } from "../hooks/useMesas";
import { RegistrarMesa } from "./Formularios/RegistrarMesa";

export const Diagrama = () => {
  const [open, setOpen] = useState(false);
  const [mesas, setMesas] = useState([]);

  const { data, refetch } = useMesas();
  const { mutate } = useMutateModificarMesa();

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
      setMesas(mesasBase);
    }
  }, [data]);

  const arrastrar = (d: any, mesa: any) => {
    const mesasFiltradas: any[] = mesas.filter(
      (mesalocal: any) => mesalocal.id !== mesa.id
    );

    const modificarMesa: any = mesas.find(
      (mesalocal: any) => mesalocal.id == mesa.id
    );

    modificarMesa.estilos = {
      ...modificarMesa.estilos,
      x: d.x,
      y: d.y,
    };

    const nuevoArreglo: any = [...mesasFiltradas, modificarMesa];

    setMesas(nuevoArreglo);
  };

  const renderMesas = mesas.map((mesa: any) => (
    <>
      <Rnd
        bounds="parent"
        position={{ x: mesa.estilos.x, y: mesa.estilos.y }}
        size={{ width: mesa.estilos.width, height: mesa.estilos.height }}
        style={{
          background: mesa.estilos.background,
          padding: "20px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
        onDragStop={(e, d) => {
          arrastrar(d, mesa);
        }}
        default={{
          ...mesa.estilos,
        }}
      >
        {mesa.num_mesa}
      </Rnd>
    </>
  ));

  const { mutate: updateMesa } = useMutateModificarMesa();
  const handleClickGuardar = () => {
    const arregloMesas = mesas.map((mesa: any) => {
      return {
        id: mesa.id,
        x: mesa.estilos.x,
        y: mesa.estilos.y,
        width: mesa.estilos.width,
        height: mesa.estilos.height,
      };
    });
    updateMesa(arregloMesas, {
      onSuccess: () => {
        // form.reset();
      },
    });
    console.log(arregloMesas);
  };

  return (
    <>
      <RegistrarMesa open={open} setOpen={setOpen} refetch={refetch} />
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
