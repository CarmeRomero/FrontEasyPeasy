import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Textarea,
  Grid,
  TextInput,
  Select,
  Switch,
  Menu,
  Tabs,
  TabsProps,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  BoxMargin,
  Circle,
  Dots,
  Edit,
  Photo,
  Settings,
  Trash,
} from "tabler-icons-react";
import {
  useArticulosMismaCategoria,
  useMutateArticulo,
} from "../../hooks/useArticulos";
import {
  useCategorias,
  useMutateCategoriaEliminar,
} from "../../hooks/useCategoria";
import { IArticulo } from "../../interfaces/articulo";
import { useState, useRef, useEffect, useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { RegistrarCategoria } from "./registrarCategoria";

export const RegistrarTicket = () => {
  return (
    <>
      <Box>
        <Text align="center" my="xl">
          Seleccione una mesa
        </Text>
      </Box>

      <Tabs color="yellow" tabPadding="xl" grow position="apart">
        <Tabs.Tab label="1"></Tabs.Tab>
        <Tabs.Tab label="2">Messages tab content</Tabs.Tab>
        <Tabs.Tab label="3">Settings tab content</Tabs.Tab>
        <Tabs.Tab label="4 "></Tabs.Tab>
        <Tabs.Tab label="5">Messages tab content</Tabs.Tab>
        <Tabs.Tab label="6">Settings tab content</Tabs.Tab>
      </Tabs>
    </>
  );
};
