export interface IUsuario {
  nombre: string;
  apellido: string;
  email: string;
  verificacionEmail?: Date | string | null;
  password: string;
  rol?: string;
  DNI: number | null;
  fecha_nacimiento: Date | string | null;
  telefono: number | null;
  direccion: string;
}
