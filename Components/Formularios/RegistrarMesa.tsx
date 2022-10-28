import {
  TextInput,
  Group,
  Button,
  Grid,
  Modal,
  MODAL_SIZES,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useMesas, useMutateMesa } from "../../hooks/useMesas";
import { useEffect } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const RegistrarMesa = ({ open, setOpen }: Props) => {
  const form = useForm({
    initialValues: {
      num_mesa: 1,
      color: "#a1e6b3",
      ubicacion: "ADENTRO",
      x: 20,
      y: 50,
      width: 100,
      height: 100,
      // num_mesa: null,
      // color: "",
      // ubicacion: "",
      // x: null,
      // y: null,
      // width: null,
      // height: null,
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const { mutate } = useMutateMesa();
  const { data, refetch } = useMesas();

  const handleSubmit = (values: any) => {
    console.log(values);
    mutate(values);
    setOpen(false);
    refetch();
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Agregar mesa"
      size={MODAL_SIZES.sm}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col md={12}>
            <NumberInput
              label="num_mesa"
              placeholder="num_mesa"
              autoComplete="off"
              id="num_mesa"
              {...form.getInputProps("num_mesa")}
            />
            <TextInput
              label="color"
              placeholder="color"
              autoComplete="off"
              id="color"
              {...form.getInputProps("color")}
            />
            <TextInput
              label="ubicacion"
              placeholder="ubicacion"
              autoComplete="off"
              id="ubicacion"
              {...form.getInputProps("ubicacion")}
            />
            <NumberInput
              label="x"
              placeholder="x"
              autoComplete="off"
              id="x"
              {...form.getInputProps("x")}
            />
            <NumberInput
              label="y"
              placeholder="y"
              autoComplete="off"
              id="y"
              {...form.getInputProps("y")}
            />
            <NumberInput
              label="width"
              placeholder="width"
              autoComplete="off"
              id="width"
              {...form.getInputProps("width")}
            />
            <NumberInput
              label="height"
              placeholder="height"
              autoComplete="off"
              id="height"
              {...form.getInputProps("height")}
            />
          </Grid.Col>
        </Grid>

        <Group position="right" mt="xl">
          <Button type="submit">Agregar</Button>
        </Group>
      </form>
    </Modal>
  );
};
