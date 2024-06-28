export interface IAgregarLibroParams {
  cantidad: number;
  editorial: string;
  isbn: string;
  precio_unitario: number;
  titulo: string;
  costo_fob: number;
}

export interface IActualizarLibroParams {
  id: string;
  cantidad?: number;
  editorial?: string;
  precio_unitario?: number;
  titulo?: string;
  costo_fob?: number;
}

export interface ICambioEstado {
  razon: string;
  id: string;
}

export interface ILibro {
  id: string;
  isbn: string;
  editorial: string;
  titulo: string;
  cantidad: number;
  precio_unitario: number;
  total: number;
  costo_fob: number;
  total_fob: number;
  estado: string | null;
}
