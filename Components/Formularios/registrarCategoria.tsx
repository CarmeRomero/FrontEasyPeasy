import { Button, Group, TextInput, Modal, MODAL_SIZES } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCategorias, useMutateCategoria } from "../../hooks/useCategoria";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const RegistrarCategoria = ({ open, setOpen }: Props) => {
  const form = useForm({
    initialValues: {
      descripcion: "",
    },
    validate: {
      descripcion: (value: any) =>
        value.length <= 0 ? "Ingrese un nombre" : null,
    },
  });

  const { refetch } = useCategorias();
  const { mutate } = useMutateCategoria();
  const handleSubmit = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        console.log(values);
        refetch();
      },
    });
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Agregar una categoría"
      size={MODAL_SIZES.sm}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Categoría"
          placeholder="Ingrese una categoría"
          id="categoria"
          {...form.getInputProps("descripcion")}
          mb="xs"
        />
        <Group position="center" mt="xl" my="lg">
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
