import { Button, Card, Grid, Image } from "@mantine/core";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useMesas, useMutateModificarMesa } from "../hooks/useMesas";
import { EliminarMesa } from "./Formularios/EliminarMesa";
import { RegistrarMesa } from "./Formularios/RegistrarMesa";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";
import { Check } from "tabler-icons-react";

export const Diagrama = () => {
  const [open, setOpen] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);

  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState();

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

  const handleClick = (mesa: any, index: any) => {
    console.log(mesa, index);
    // setMesaSeleccionada(mesa);
  };

  const renderMesas = mesas.map((mesa: any, index) => (
    <>
      <Rnd
        key={index}
        bounds="parent"
        position={{ x: mesa.estilos.x, y: mesa.estilos.y }}
        size={{ width: mesa.estilos.width, height: mesa.estilos.height }}
        style={{
          background: mesa.estilos.background,
          padding: "20px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
        onClick={() => handleClick(mesa, index)}
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
  // const handleClickGuardar = () => {
  //   const arregloMesas = mesas.map((mesa: any) => {
  //     return {
  //       id: mesa.id,
  //       x: mesa.estilos.x,
  //       y: mesa.estilos.y,
  //       width: mesa.estilos.width,
  //       height: mesa.estilos.height,
  //     };
  //   });
  //   updateMesa(arregloMesas, {
  //     onSuccess: () => {
  //       // form.reset();
  //     },
  //   });

  // };

  const modals = useModals();
  const openDeleteModal = () => {
    const arregloMesas = mesas.map((mesa: any) => {
      return {
        id: mesa.id,
        x: mesa.estilos.x,
        y: mesa.estilos.y,
        width: mesa.estilos.width,
        height: mesa.estilos.height,
      };
    });

    modals.openConfirmModal({
      title:
        "¿Está seguro que desea guardar la nueva disposición de las mesas?",
      centered: true,
      labels: { confirm: "Guardar", cancel: "Cancelar" },
      confirmProps: { color: "green" },
      onCancel: () => {},
      onConfirm: () => {
        updateMesa(arregloMesas, {
          onSuccess: () => {
            showNotification({
              color: "green",
              icon: <Check />,
              title: "Disposición de las mesas guardada",
              message: "",
            });
            refetch();
          },
        });
      },
    });
  };

  return (
    <>
      <RegistrarMesa open={open} setOpen={setOpen} refetch={refetch} />
      <EliminarMesa
        open={openEliminar}
        setOpen={setOpenEliminar}
        refetch={refetch}
      />

      <Grid>
        <Grid.Col md={12}>
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
        </Grid.Col>
        <Grid.Col md={4}>
          <Card mt={30} radius="xl" withBorder p="xl" component="a">
            <Card.Section>
              <Image
                src="https://cdn.pixabay.com/photo/2020/10/07/17/12/coffee-5635765_960_720.jpg"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Button
              variant="filled"
              color="red"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={() => setOpen(true)}
            >
              Agregar mesa
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col md={4}>
          <Card mt={30} radius="xl" withBorder p="xl" component="a">
            <Card.Section>
              <Image
                src="https://cdn.pixabay.com/photo/2020/10/07/17/12/coffee-5635765_960_720.jpg"
                height={160}
                alt="No way!"
              />
            </Card.Section>

            <Button
              variant="filled"
              color="red"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={() => setOpenEliminar(true)}
            >
              Eliminar mesa
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col md={4}>
          <Card mt={30} radius="xl" withBorder p="xl" component="a">
            <Card.Section>
              <Image
                src="https://cdn.pixabay.com/photo/2020/10/07/17/12/coffee-5635765_960_720.jpg"
                height={160}
                alt="No way!"
              />
            </Card.Section>

            <Button
              variant="filled"
              color="red"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={openDeleteModal}
            >
              Guardar diagrama
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};
