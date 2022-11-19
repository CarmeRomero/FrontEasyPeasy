import {
  Button,
  Group,
  TextInput,
  Select,
  Switch,
  Grid,
  Modal,
  MODAL_SIZES,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  actualizarArticulo,
  useArticulos,
  useUnArticulo,
} from "../../hooks/useArticulos";
import { useCategorias } from "../../hooks/useCategoria";
import { IArticulo } from "../../interfaces/articulo";
import { useState, useRef, useEffect, useMemo } from "react";
import { showNotification } from "@mantine/notifications";
import { checkServerIdentity } from "tls";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export const FormularioActualizarArticulo = ({ open, setOpen, id }: Props) => {
  const form = useForm<IArticulo>({
    initialValues: {
      codigo: "",
      id_categoria: null,
      descripcion: "",
      precio_venta: null,
      estado_alta: true,
    },
    validate: {
      id_categoria: (value: any) =>
        value === 0 ? "Seleccione categoría" : null,
      descripcion: (value: any) =>
        value.length < 2 ? "Ingrese una descripcion" : null,
      precio_venta: (value: any) => (value <= 0 ? "Ingrese un precio" : null),
    },
  });

  const [checked, setChecked] = useState();
  const { refetch } = useArticulos();
  const { data: articuloBd } = useUnArticulo(id);
  const { data: categorias } = useCategorias();

  useEffect(() => {
    if (articuloBd) {
      form.setValues({
        codigo: articuloBd.codigo,
        descripcion: articuloBd.descripcion,
        precio_venta: articuloBd.precio_venta,
        id_categoria: articuloBd.id_categoria,
        estado_alta: articuloBd.estado_alta,
      });

      setChecked(articuloBd.estado_alta);
    }
  }, [articuloBd]);

  const handleSubmit = (values: any) => {
    const articulo: IArticulo = {
      codigo: values.codigo,
      id_categoria: parseInt(values.id_categoria),
      descripcion: values.descripcion,
      precio_venta: values.precio_venta,
      estado_alta: checked
        ? (values.estado_alta = true)
        : (values.estado_alta = false),
    };

    actualizarArticulo(id, articulo);
    refetch();
    showNotification({
      title: "Éxito!",
      message: "Se guardaron los cambios!👌",
      color: "green",
      autoClose: 6000,
    });

    setOpen(false);
  };

  const handleChange = (value: any) => {
    form.setFieldValue("id_categoria", value);
  };

  const switchChange = (value: any) => {
    // form.setFieldValue("estado_alta", checked);
    console.log(value);
  };

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Editar el artículo"
      size={MODAL_SIZES.sm}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col md={12}>
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
            <br />
            <Switch
              label="Habilitar"
              color="grape"
              // checked={}
              onChange={switchChange}
              {...form.getInputProps("estado_alta")}
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
            Guardar
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
