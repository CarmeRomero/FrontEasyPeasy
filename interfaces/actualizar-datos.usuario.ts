export interface IActualizarDatosUsuario {
  nombre: string | undefined;
  apellido: string;
  fecha_nacimiento: Date | string | null;
  telefono: number | null;
  direccion: string;
}
