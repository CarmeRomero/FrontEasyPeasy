import { IDetallePedido } from "../../interfaces/detalle-pedido";
import { detalleEstado } from "./pedidoProvider";

type PedidoActionType = {
  type: "[Pedido] - AgregarPedido";
  payload: IDetallePedido;
};

export const pedidoReducer = (
  state: detalleEstado,
  action: PedidoActionType
): detalleEstado => {
  switch (action.type) {
    case "[Pedido] - AgregarPedido":
      return {
        ...state,
        detalle: [...state.detalle, action.payload],
      };

    default:
      return state;
  }
};
