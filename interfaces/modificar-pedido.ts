import { IActualizarDetallePedido } from "./detalle-pedido-actualizar";

export interface IModificarPedido {
  id_mesa: number | null;
  fecha_hora_pedido?: Date | null;
  fecha_hora_entrega?: Date | null;
  observaciones: string;
  estado?: string;
  Detalle_Pedidos: IActualizarDetallePedido[];
}
