export interface IDatosUsuario {
  nombre: string | undefined;
  apellido: string;
  email: string;
  rol?: string;
  DNI: number | null;
  fecha_nacimiento: Date | string | null;
  telefono: number | null;
  direccion: string;
}
