import {
  TextInput,
  Group,
  Button,
  Grid,
  Modal,
  MODAL_SIZES,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMesas, useMutateMesa } from "../../hooks/useMesas";
import { IMesa } from "../../interfaces/mesa";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

export const RegistrarMesa = ({ open, setOpen, refetch }: Props) => {
  const { data } = useMesas();

  const form = useForm({
    initialValues: {
      num_mesa: null,
      color: "#a1e6b3",
      ubicacion: "ADENTRO",
      x: 20,
      y: 50,
      width: 100,
      height: 100,
    },
    validate: {
      num_mesa: (value: any) =>
        data.map((item: any) => {
          item.num_mesa === value ? "Ese número de mesa ya existe" : null;
        }),
    },
  });

  const { mutate } = useMutateMesa();

  const handleSubmit = (values: any) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        refetch();
      },
    });
    setOpen(false);
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Agregar mesa"
      size={MODAL_SIZES.md}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col md={12}>
            <NumberInput
              label="Número de la mesa"
              placeholder="num_mesa"
              autoComplete="off"
              id="num_mesa"
              hideControls
              {...form.getInputProps("num_mesa")}
            />
            <TextInput
              label="Color"
              placeholder="color"
              autoComplete="off"
              id="color"
              {...form.getInputProps("color")}
            />
            <TextInput
              label="Ubicacion"
              placeholder="ubicacion"
              autoComplete="off"
              id="ubicacion"
              {...form.getInputProps("ubicacion")}
            />
          </Grid.Col>

          <Grid.Col md={6}>
            <NumberInput
              label="Posición: x"
              placeholder="x"
              autoComplete="off"
              id="x"
              hideControls
              {...form.getInputProps("x")}
            />
            <NumberInput
              label="Posición: y"
              placeholder="y"
              autoComplete="off"
              id="y"
              hideControls
              {...form.getInputProps("y")}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <NumberInput
              label="Ancho de la mesa"
              placeholder="width"
              autoComplete="off"
              id="width"
              hideControls
              {...form.getInputProps("width")}
            />
            <NumberInput
              label="Largo de la mesa"
              placeholder="height"
              autoComplete="off"
              id="height"
              hideControls
              {...form.getInputProps("height")}
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
          >
            Agregar
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
