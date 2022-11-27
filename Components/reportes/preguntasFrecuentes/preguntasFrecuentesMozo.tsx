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

export const PreguntasFrecuentesMozo = ({ open, setOpen }: Props) => {
  return (
    <Modal opened={open} onClose={() => setOpen(false)} size={MODAL_SIZES.xl}>
      <Text size="lg" weight={500} align="center" color={"red"}>
        Preguntas frecuentes
      </Text>
      <Divider />

      <Accordion disableIconRotation>
        <Accordion.Item
          label="¿Cómo hago para asignarme como mozo de un pedido? "
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Cada vez que un pedido sea generado éste va a asignarse
          automáticamente al usuario logueado, por lo que no es necesario hacer
          algo más que realizar el pedido. El nombre del mozo a cargo del pedido
          figura también en el ticket del pedido.
        </Accordion.Item>
        <Accordion.Item
          label="¿Puedo ver quién atiende cada mesa?"
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Por el momento no, se puede ver cuales son las mesas atendidas por uno
          mismo, cuales son las que están libres y cuales atiende otra persona,
          pero no especificamente quién.
        </Accordion.Item>
        <Accordion.Item
          label="¿Puedo saber la cantidad de pedidos realizados en el día?"
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Si, en la sección de "Ranking" se puede elegir las fechas entre las se
          desea saber la cantidad de pedidos realizados. Si lo que se quiere
          conocer es la cantidad del último día es necesario poner como fecha de
          inicio ese día y fecha fin el día siguiente.
        </Accordion.Item>

        <Accordion.Item
          label="¿Puedo generar más de un pedido por mesa?"
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          Si, pero hay que tener en cuenta que si el pedido no fue cobrado aún
          es posible editarlo para agregarle más productos o quitárselos, según
          la necesidad.
        </Accordion.Item>
        <Accordion.Item
          label="¿En que momento la mesa que tengo asignada pasa a estar 'Libre'?"
          icon={
            <ThemeIcon color="violet" variant="light">
              <Point size={14} />
            </ThemeIcon>
          }
        >
          La mesa pasa a su estado 'Libre' una vez que el ticket fue generado y
          cobrado.
        </Accordion.Item>
      </Accordion>
    </Modal>
  );
};
