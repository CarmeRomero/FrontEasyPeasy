export interface ITicket {
  id_pedido: number | null;
  id_usuario: number | null;
  fecha_hora: Date | null;
  estado_pendiente_pago: Boolean;
  total: number | null;
}
