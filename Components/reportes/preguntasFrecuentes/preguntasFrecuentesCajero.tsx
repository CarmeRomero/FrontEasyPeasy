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

export const PreguntasFrecuentesCajero = ({ open, setOpen }: Props) => {
  return (
    <Modal opened={open} onClose={() => setOpen(false)} size={MODAL_SIZES.xl}>
      <Text size="lg" weight={500} align="center" color={"red"}>
        Preguntas frecuentes
      </Text>
      <Divider />

      <Accordion disableIconRotation>
        <Accordion.Item
          label="¿Puedo modificar o eliminar los tickets generados? "
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          No, los tickets no pueden ser modificados ni eliminados una vez
          generados. Si hay que hacer algún cambio en el pedido es posible
          hacerlo antes de generar el ticket desde el perfil de 'Mozo'.
        </Accordion.Item>
        <Accordion.Item
          label="¿Qué es lo que me muestra la sección de 'Caja'? "
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Lo que se muestra en la sección de 'Caja' son los ingresos del día
          vigente que se hicieron a través de los distintos medios de pago, y
          también la cantidad de tickets generados en cada caso. Por abajo de
          los ingresos se encuentra una comparativa con respecto al día
          anterior, esta misma nos indica el porcentaje(%) de diferencia que hay
          entre un día y el otro. Por ejemplo, si el día de ayer ingresaron
          $1000 y el día de hoy sólo $500, se mostrará '50% por abajo del día de
          ayer'.
        </Accordion.Item>
        <Accordion.Item
          label="¿Es posible modificar los valores de la caja o la cantidad de tickets?"
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          No es posible modificar la caja ya que los datos que se muestran son
          generados automáticamente cuando se cobra un ticket.
        </Accordion.Item>
      </Accordion>
    </Modal>
  );
};
