import { Button, Group, Grid, Select, Modal, MODAL_SIZES } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useFormasPago } from "../../hooks/useFormasPago";
import { useState } from "react";
import { ICobro } from "../../interfaces/cobro";
import { actualizarTicket, useTickets } from "../../hooks/useTickets";
import { useMutateActualizarEstadoLibre } from "../../hooks/useMesas";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";
import { Check } from "tabler-icons-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
  mesa: number;
  idMesa: number;
}

export const FormularioCobro = ({ open, setOpen, id, mesa, idMesa }: Props) => {
  const [combo, setCombo] = useState();

  const form = useForm<ICobro>({
    initialValues: {
      id_forma_pago: null,
      estado_pendiente_pago: true,
    },
    validate: {
      id_forma_pago: (value: any) =>
        value <= 0 ? "Seleccione una forma de pago" : null,
    },
  });
  const { refetch } = useTickets();
  const { mutate } = useMutateActualizarEstadoLibre();

  const { data: formaDePago } = useFormasPago();

  // const handleSubmit = (values: any) => {
  //   const cobro: ICobro = {
  //     id_forma_pago: parseInt(values.id_forma_pago),
  //     estado_pendiente_pago: false,
  //   };

  //   actualizarTicket(id, cobro);
  //   mutate(idMesa, {
  //     onSuccess: () => {
  //       refetch();
  //     },
  //   });

  //   refetch();
  //   setOpen(true);
  // };

  const modals = useModals();
  const handleSubmit = (values: any) => {
    const cobro: ICobro = {
      id_forma_pago: parseInt(values.id_forma_pago),
      estado_pendiente_pago: false,
    };

    refetch();
    setOpen(false);
    modals.openConfirmModal({
      title: "¿Realizar cobro de la mesa?",
      centered: true,
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      confirmProps: { color: "green" },
      onCancel: () => {},
      onConfirm: () => {
        actualizarTicket(id, cobro);
        mutate(idMesa, {
          onSuccess: () => {
            showNotification({
              color: "green",
              icon: <Check />,
              title: "Se realizó el cobro con éxito!",
              message: "",
            });
            refetch();
          },
        });
      },
    });
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
