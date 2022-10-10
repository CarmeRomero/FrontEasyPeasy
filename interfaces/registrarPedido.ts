import { IDetallePedido } from "./detalle-pedido";

export interface IPedido {
  id_mesa: number | null;
  id_usuario: number | null;
  fecha_hora_pedido?: Date | null;
  num_pedido: number | null;
  fecha_hora_entrega?: Date | null;
  observaciones: string;
  estado?: string;
  Detalle_Pedidos: IDetallePedido[];
}
