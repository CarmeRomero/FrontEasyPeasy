import { Box, Button, Select, SimpleGrid, Card, Textarea } from "@mantine/core";
import { PedidoContext } from "../../context/pedido/pedidoContex";
import { useContext } from "react";
import { useForm } from "@mantine/form";
import { IPedido } from "../../interfaces/registrarPedido";
import { useMutateCrearPedido } from "../../hooks/usePedidos";

//////// NO SE USA /////////////

export const FormularioRegistrarPedido = () => {
  const { detalle } = useContext(PedidoContext);

  const form = useForm<IPedido>({
    initialValues: {
      id_mesa: null,
      id_usuario: null,
      fecha_hora_pedido: null,
      fecha_hora_entrega: null,
      observaciones: "",
      estado: "",
      Detalle_Pedidos: [],
    },
    validate: {
      id_mesa: (value: any) => (value <= 0 ? "Ingresar una mesa" : null),
      fecha_hora_pedido: (value: any) =>
        value != null ? "Ingresar fecha y hora de pedido" : null,
      // Detalle_Pedidos: (value: any) =>
      //   (value = [] ? "Seleccione los productos" : null),
    },
  });
  const { mutate, error, isLoading } = useMutateCrearPedido();

  const handleSubmit = (values: any) => {
    const pedido: IPedido = {
      id_mesa: values.id_mesa,
      id_usuario: values.id_usuario,
      fecha_hora_pedido: new Date(),
      fecha_hora_entrega: null,
      observaciones: values.observaciones,
      estado: "PENDIENTE",
      Detalle_Pedidos: detalle,
    };
    mutate(pedido, {
      onSuccess: () => {
        console.log(values);
      },
    });
  };
  const handleChange = (value: any) => {
    form.setFieldValue("id_mesa", value);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div>
        <Select
          label="Seleccione una mesa"
          placeholder="Seleccione una"
          id="mesas"
          onChange={handleChange}
          // searchable
          autoComplete="off"
          maxDropdownHeight={230}
          nothingFound="No hay mesas"
          data={[
            { value: "1", label: "Mesa 1" },
            { value: "2", label: "Mesa 2" },
            { value: "3", label: "Mesa 3" },
          ]}
        />
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 2, spacing: "sm" },
          ]}
          my="md"
        >
          <div
            className="ag-theme-alpine"
            style={{
              width: "50vw",
              height: 400,
              padding: 20,
              maxWidth: "30vw",
              marginLeft: "80px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ flex: 1 }}>
                <Card
                  sx={{
                    border: "1px solid #dee2e6",
                    boxShadow:
                      "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
                  }}
                >
                  {detalle.length > 0 ? (
                    detalle.map((item, index) => {
                      return (
                        <Box key={index}>
                          <Box>{`cantidad: ${item.cantidad}`}</Box>
                          <Box>{`precio: ${item.precio}`}</Box>
                        </Box>
                      );
                    })
                  ) : (
                    <Box>No hay detalles</Box>
                  )}
                </Card>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }} mt={10}>
              <Button variant="outline" color="grape">
                Registrar pedido
              </Button>
            </Box>
          </div>
        </SimpleGrid>
        <Box
          sx={{ display: "flex", justifyContent: "begin", minWidth: "" }}
          mt={0}
        >
          <Textarea
            placeholder="Observaciones"
            label="Observaciones"
            radius="md"
            {...form.getInputProps("observaciones")}
            mb="xs"
          />
        </Box>
      </div>
    </form>
  );
};
