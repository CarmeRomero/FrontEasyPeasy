import { Group, Button, Grid, Modal, MODAL_SIZES, Select } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import {
  useMesas,
  useMutateAnularMesa,
  useMutateMesa,
} from "../../hooks/useMesas";
import { IEliminarMesa } from "../../interfaces/eliminar-mesa";
import { IMesa } from "../../interfaces/mesa";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";
import { Check } from "tabler-icons-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

export const EliminarMesa = ({ open, setOpen, refetch }: Props) => {
  const [idMesa, setIdMesa] = useState();

  const { data: mesas } = useMesas();
  const { mutate } = useMutateAnularMesa();

  // const handleDelete = (values: any) => {
  //   mutate(values, {
  //     onSuccess: () => {
  //       refetch();
  //     },
  //   });
  //   setOpen(false);
  // };
  const modals = useModals();
  const handleDelete = (values: any) => {
    refetch();
    setOpen(false);
    modals.openConfirmModal({
      title: "¿Está seguro de eliminar la mesa?",
      centered: true,
      labels: { confirm: "Elimiar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        mutate(values, {
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
    setIdMesa(value);
  };

  return (
    <Modal opened={open} onClose={() => setOpen(false)} size={MODAL_SIZES.md}>
      <Group position="center">
        <h3>Seleccione la mesa que desea eliminar</h3>
      </Group>
      <Grid>
        <Grid.Col md={12}>
          <Select
            label="Mesas"
            placeholder="Seleccione un número de mesa"
            id="mesa"
            onChange={handleChange}
            autoComplete="off"
            nothingFound="Sin mesas"
            data={
              mesas
                ? mesas.map(({ id, num_mesa }: any) => ({
                    label: num_mesa,
                    value: id,
                  }))
                : []
            }
          />
        </Grid.Col>
      </Grid>

      <Group position="center" mt="xl">
        <Button
          variant="outline"
          fullWidth
          color="grape"
          radius="xl"
          size="md"
          type="submit"
          onClick={() => {
            handleDelete(idMesa);
          }}
        >
          Eliminar
        </Button>
      </Group>
    </Modal>
  );
};
