export interface IActualizarDatosUsuario {
  nombre: string | undefined;
  apellido: string;
  fecha_nacimiento: Date | string | null;
  telefono: string | null;
  direccion: string;
}
