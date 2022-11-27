import {
  Button,
  Group,
  TextInput,
  Select,
  Switch,
  Grid,
  Modal,
  MODAL_SIZES,
  Accordion,
  ThemeIcon,
  Box,
  Text,
  Divider,
} from "@mantine/core";

import { useState, useRef, useEffect, useMemo } from "react";
import { Palette, Point } from "tabler-icons-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PreguntasFrecuentes = ({ open, setOpen }: Props) => {
  const handleSubmit = (values: any) => {};

  return (
    <Modal opened={open} onClose={() => setOpen(false)} size={MODAL_SIZES.xl}>
      <Text size="lg" weight={500} align="center" color={"red"}>
        Preguntas frecuentes
      </Text>
      <Divider />

      <Accordion disableIconRotation>
        <Accordion.Item
          label="¿Cuántos usuarios pueden registrarse? "
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Easy Peasy no limita el número de usuarios. Podrán registrarse los
          usuarios que requiera y asignarles perfiles como por ejemplo: mesero,
          cajero, administrador.
        </Accordion.Item>
        <Accordion.Item
          label="¿Puedo dar de baja un usuario que ya no se encuentre activo?"
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Si, desde el listado de usuarios vas a poder dar de baja a los
          empleados. Otra opción, es cambiar el rol a "visitante", de esta
          manera el usuario no tiene permisos para realizar ninguna operación en
          la página y se puede volver a poner operativa la cuenta cuando se
          desee (volviendo a asignar el rol de Mozo o Cajero)
        </Accordion.Item>
        <Accordion.Item
          label="¿Cómo hacer para darle los permisos al empleado según su puesto?"
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Una vez que el empleado se registró en la página y confirmó su email a
          través del correo electrónico va a figurar en el listado de
          "Usuarios". Desde allí, haciendo click en el botón de acciones podrá
          elegir cambiar el rol del empleado, esto le otorgará automáticamente
          los permisos que esten asigados al rol elegido.
        </Accordion.Item>

        <Accordion.Item
          label="¿Existe un límite para la cantidad de mesas?"
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Se pueden agregar la cantidad de mesas que permita el plano, recordá
          que el tamaño de cada mesa puede ajustarse según tus necesidades.
        </Accordion.Item>
      </Accordion>
    </Modal>
  );
};
