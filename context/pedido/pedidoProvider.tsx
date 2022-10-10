import { useReducer } from "react";
import { IDetallePedido } from "../../interfaces/detalle-pedido";
import { PedidoContext } from "./pedidoContex";
import { pedidoReducer } from "./pedidoReducer";

export interface detalleEstado {
  detalle: IDetallePedido[];
}

const CAJA_INITIAL_STATE: detalleEstado = {
  detalle: [],
};

export const PedidoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(pedidoReducer, CAJA_INITIAL_STATE);

  const agregarContenido = (payload: IDetallePedido) => {
    dispatch({
      type: "[Pedido] - AgregarPedido",
      payload,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        ...state,

        agregarContenido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
