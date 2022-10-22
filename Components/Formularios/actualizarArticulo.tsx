import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
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
  useArticulos,
  useMutateArticulo,
  useUnArticulo,
} from "../../hooks/useArticulos";
import { useCategorias } from "../../hooks/useCategoria";
import { IArticulo } from "../../interfaces/articulo";
import { useState, useRef, useEffect, useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { RegistrarCategoria } from "./registrarCategoria";
import { SelectItems } from "@mantine/core/lib/components/Select/SelectItems/SelectItems";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export const FormularioActualizarArticulo = ({ open, setOpen, id }: Props) => {
  const [combo, setCombo] = useState();

  const form = useForm<IArticulo>({
    initialValues: {
      codigo: "",
      id_categoria: null,
      descripcion: "",
      precio_venta: null,
      estado_alta: false,
    },
    validate: {
      id_categoria: (value: any) =>
        value === 0 ? "Seleccione categoría" : null,
      descripcion: (value: any) =>
        value.length <= 3 ? "Ingrese una descripcion" : null,
      precio_venta: (value: any) => (value <= 0 ? "Ingrese un precio" : null),
    },
  });
  const { refetch } = useArticulos();

  const { data: articulo } = useUnArticulo(id);
  const { mutate, error, isLoading } = useMutateArticulo();
  const { data: categorias } = useCategorias();

  useEffect(() => {
    if (articulo) {
      form.setValues({
        codigo: articulo.codigo,
        descripcion: articulo.descripcion,
        precio_venta: articulo.precio_venta,
        id_categoria: articulo.id_categoria,
      });
    }
  }, [articulo]);

  const handleSubmit = (values: any) => {
    const articulo: IArticulo = {
      codigo: values.codigo,
      id_categoria: parseInt(values.id_categoria),
      descripcion: values.descripcion,
      precio_venta: values.precio_venta,
      estado_alta: values.estado_alta,
    };
    mutate(articulo, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  const handleChange = (value: any) => {
    form.setFieldValue("id_categoria", value);
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Editar el artículo"
      size={MODAL_SIZES.sm}
    >
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
            label="Código"
            placeholder="Código"
            id="codigo"
            {...form.getInputProps("codigo")}
            mb="xs"
            disabled
          />
          <TextInput
            label="Descripción"
            {...form.getInputProps("descripcion")}
            mb="xs"
          />
          <TextInput
            label="Precio de venta"
            hideControls
            id="precio"
            {...form.getInputProps("precio_venta")}
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
          <Select
            label="Categoría"
            placeholder="Seleccione una"
            id="categorias"
            onChange={handleChange}
            searchable
            autoComplete="off"
            maxDropdownHeight={230}
            nothingFound="No hay categorías"
            data={
              categorias
                ? categorias.map(({ descripcion, id }: any) => ({
                    label: descripcion,
                    value: id,
                  }))
                : []
            }
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
          <Switch
            label="Habilitar"
            color="grape"
            {...form.getInputProps("estado_alta")}
          />
        </SimpleGrid>

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
