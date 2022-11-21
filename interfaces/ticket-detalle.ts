export interface Articulos {
  id: number;
  codigo: string;
  id_categoria?: any;
  descripcion: string;
  precio_venta: string;
  estado_alta: boolean;
}

export interface DetallePedido {
  Articulos: Articulos;
  precio: string;
  cantidad: number;
}

export interface Mesas {
  id: number;
  id_usuario?: any;
  num_mesa: number;
  color: string;
  ubicacion: string;
  x: number;
  y: number;
  width: number;
  height: number;
  estado: string;
}

export interface Pedido {
  Detalle_Pedidos: DetallePedido[];
  Mesas: Mesas;
}

export interface Usuarios {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  verificacionEmail: Date;
  password: string;
  rol: string;
  DNI: number;
  fecha_nacimiento: Date;
  telefono: string;
  direccion: string;
  fecha_baja?: any;
}

export interface ITicketDetalle {
  id: number;
  id_pedido: number;
  id_usuario: number;
  id_forma_pago?: any;
  num_ticket: number;
  fecha_hora: Date;
  estado_pendiente_pago: boolean;
  total: string;
  Pedido: Pedido;
  Usuarios: Usuarios;
  formas_pago?: any;
}
