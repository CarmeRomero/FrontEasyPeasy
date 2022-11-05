import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Grid,
  Textarea,
  TextInput,
  Select,
  Switch,
  Menu,
  Modal,
  MODAL_SIZES,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { BoxMargin, Dots, Edit, Id, Trash } from "tabler-icons-react";
import {
  actualizarArticulo,
  useArticulos,
  useMutateArticulo,
  useUnArticulo,
} from "../../hooks/useArticulos";
import { useFormasPago } from "../../hooks/useFormasPago";
import { IArticulo } from "../../interfaces/articulo";
import { useState, useRef, useEffect, useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { RegistrarCategoria } from "./registrarCategoria";
import { SelectItems } from "@mantine/core/lib/components/Select/SelectItems/SelectItems";
import { IActualizarFormaPago as ICobro } from "../../interfaces/actualizar-forma-pago";
import {
  actualizarTicket,
  useTickets,
  useUnTicket,
} from "../../hooks/useTickets";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
  mesa: number;
}

export const FormularioCobro = ({ open, setOpen, id, mesa }: Props) => {
  const [combo, setCombo] = useState();

  const form = useForm<ICobro>({
    initialValues: {
      id_forma_pago: null,
      estado_pendiente_pago: true,
    },
    validate: {
      id_forma_pago: (value: any) =>
        value === 0 ? "Seleccione una forma de pago" : null,
    },
  });
  const { refetch } = useTickets();

  const { data: formaDePago } = useFormasPago();

  useEffect(() => {}, [formaDePago]);
  console.log(mesa);

  const handleSubmit = (values: any) => {
    const formaPago: ICobro = {
      id_forma_pago: parseInt(values.id_forma_pago),
      estado_pendiente_pago: false,
    };

    actualizarTicket(id, formaPago);
    refetch();
    setOpen(true);
  };

  const handleChange = (value: any) => {
    form.setFieldValue("id_forma_pago", value);
  };

  return (
    <Modal opened={open} onClose={() => setOpen(false)} size={MODAL_SIZES.sm}>
      <Group position="center" mb={10}>
        <h3>Se está por cobrar la mesa n° {mesa}</h3>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col md={12}>
            <Select
              label="Seleccione una Forma de pago"
              placeholder="Seleccione una"
              id="forma_pago"
              onChange={handleChange}
              searchable
              autoComplete="off"
              maxDropdownHeight={230}
              nothingFound="No hay formas de pago"
              data={
                formaDePago
                  ? formaDePago.map(({ descripcion, id }: any) => ({
                      label: descripcion,
                      value: id,
                    }))
                  : []
              }
            />
          </Grid.Col>
        </Grid>

        <Group position="center" mt="xl" my="md">
          <Button
            variant="outline"
            fullWidth
            color="grape"
            radius="xl"
            size="md"
            type="submit"
          >
            Cobrar
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
