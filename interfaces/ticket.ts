export interface ITicket {
  id_pedido: number | null;
  id_usuario: number | null;
  id_forma_pago: number | null;
  num_ticket: number | null;
  estado_pendiente_pago: Boolean;
  total: number | null;
}
