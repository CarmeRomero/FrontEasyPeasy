import { Button, Group, TextInput, Modal, MODAL_SIZES } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCategorias, useMutateCategoria } from "../../hooks/useCategoria";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const RegistrarCategoria = ({ open, setOpen }: Props) => {
  const formulario = useForm({
    initialValues: {
      descripcion: "",
    },
    validate: {
      descripcion: (value: any) =>
        value.length <= 0 ? "Ingrese un nombre para la categoría" : null,
    },
  });

  const { refetch } = useCategorias();
  const { mutate } = useMutateCategoria();
  const handleSubmitCategoria = (values: any) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
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
      <form onSubmit={formulario.onSubmit(handleSubmitCategoria)}>
        <TextInput
          label="Categoría"
          placeholder="Ingrese una categoría"
          id="categoria"
          {...formulario.getInputProps("descripcion")}
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
