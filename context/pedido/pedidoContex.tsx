import { createContext } from "react";
import { IDetallePedido } from "../../interfaces/detalle-pedido";

interface ContextProps {
  detalle: IDetallePedido[];

  agregarContenido: (payload: IDetallePedido) => void;
}

export const PedidoContext = createContext({} as ContextProps);
