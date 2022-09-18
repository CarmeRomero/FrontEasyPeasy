import {
  Box,
  Button,
  Card,
  Group,
  Stack,
  TextInput,
  Modal,
  MODAL_SIZES,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  crearUsuario,
  useMutateActualizarRol,
  useRoles,
  useUsuarios,
} from "../../hooks/useUsuario";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export const SeleccionarRol = ({ open, setOpen, id }: Props) => {
  const form = useForm({
    initialValues: {
      rol: "",
    },
    // validate: {
    //   nombre: (value: any) => (value.length <= 0 ? "Ingrese un nombre" : null),
    // },
  });
  const { refetch } = useUsuarios();

  // const { mutate, error, isLoading } = useMutateCliente();
  const { mutate } = useMutateActualizarRol();
  const handleSubmit = (values: any) => {
    mutate(
      { id, rol: values.rol },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleChange = (value: any) => {
    form.setFieldValue("rol", value);
  };

  const { data: roles } = useRoles();
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Agregar estante al depósito"
      size={MODAL_SIZES.sm}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Rol"
          placeholder="Seleccione un rol"
          id="rol"
          searchable
          onChange={handleChange}
          autoComplete="off"
          nothingFound="Sin roles"
          data={[
            { value: "ADMIN", label: "ADMIN" },
            { value: "MOZO", label: "MOZO" },
            { value: "CAJERO", label: "CAJERO" },
            { value: "VISITANTE", label: "VISITANTE" },
          ]}
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
            Asignar rol
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
