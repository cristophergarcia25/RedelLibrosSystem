export interface ICrearProveedorParams {
  nombre: string;
  correo: string;
  direccion: string;
  telefono: string;
}

export interface IActualizarProveedorParams {
  id: string;
  nombre?: string;
  correo?: string;
  direccion?: string;
  telefono?: string;
}
