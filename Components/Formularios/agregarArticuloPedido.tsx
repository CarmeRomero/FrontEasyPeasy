import {
  Button,
  Group,
  NumberInput,
  SimpleGrid,
  TextInput,
  Modal,
  MODAL_SIZES,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { IDetallePedido } from "../../interfaces/detalle-pedido";
import { useMutateCrearPedido } from "../../hooks/usePedidos";
import { IPedido } from "../../interfaces/registrarPedido";
import { PedidoContext } from "../../context/pedido/pedidoContex";
import { useContext } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

export const FormularioAgregarArticuloPedido = ({
  open,
  setOpen,
  data,
}: Props) => {
  const { agregarContenido } = useContext(PedidoContext);

  const formArticulo = useForm({
    initialValues: {
      descripcion: data.descripcion,
    },
    validate: {},
  });
  const form = useForm({
    initialValues: {
      id_articulo: data.id,
      cantidad: null,
      precio: data.precio_venta,
    },
    validate: {},
  });

  const { mutate, error, isLoading } = useMutateCrearPedido();

  const handleSubmit = (values: any) => {
    const detalleDelPedido: IDetallePedido = {
      id_articulo: values.id_articulo,
      cantidad: values.cantidad,
      precio: values.precio,
    };

    console.log(detalleDelPedido);
    agregarContenido(detalleDelPedido);
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Editar el artículo"
      size={MODAL_SIZES.sm}
    >
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 2, spacing: "sm" },
        ]}
        my="md"
      >
        {/* <TextInput label="Descripción" {...form.getInputProps("")} mb="xs" /> */}
      </SimpleGrid>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 2, spacing: "sm" },
          ]}
          my="md"
        >
          <TextInput
            label="Descripción"
            {...formArticulo.getInputProps("descripcion")}
            mb="xs"
          />

          <TextInput
            label="Precio"
            id="precio"
            {...form.getInputProps("precio")}
            mb="xs"
          />
        </SimpleGrid>
        <SimpleGrid
          cols={1}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 2, spacing: "sm" },
          ]}
          my="md"
        >
          <NumberInput
            placeholder="Ingrese la cantidad"
            label="Cantidad"
            hideControls
            id="cantidad"
            {...form.getInputProps("cantidad")}
            mb="xs"
          />
        </SimpleGrid>

        <SimpleGrid
          cols={1}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 2, spacing: "sm" },
          ]}
          my="md"
        ></SimpleGrid>

        <Group position="center" mt="xl" my="md">
          <Button
            variant="outline"
            fullWidth
            color="grape"
            radius="xl"
            size="md"
            type="submit"
          >
            Guardar
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
