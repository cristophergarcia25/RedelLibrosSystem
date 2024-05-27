export interface IAgregarLibroParams {
  cantidad: number;
  editorial: string;
  isbn: string;
  precio_unitario: number;
  titulo: string;
}

export interface IActualizarLibroParams {
  id: string;
  cantidad?: number;
  editorial?: string;
  precio_unitario?: number;
  titulo?: string;
}
