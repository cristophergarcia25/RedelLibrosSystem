export interface IAgregarLibroParams {
  cantidad: number;
  editorial: string;
  isbn: string;
  precio_unitario: string;
  titulo: string;
  costo_fob: string;
}

export interface IActualizarLibroParams {
  id: string;
  cantidad?: number;
  editorial?: string;
  precio_unitario?: string;
  titulo?: string;
  costo_fob?: string;
}

export interface ILibro {
  id: string;
  isbn: string;
  editorial: string;
  titulo: string;
  cantidad: number;
  precio_unitario: string;
  total: string;
  costo_fob: string;
  total_fob: string;
  estado: string | null;
}
