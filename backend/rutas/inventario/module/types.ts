export interface IAgregarLibroParams {
  cantidad: number;
  editorial: string;
  isbn: string;
  precio_unitario: number;
  titulo: string;
  costo_fob: number;
  id_usuario: string;
  id_proveedor: string;
  numero_factura: string;
  proviene?: string;
}

export interface IActualizarLibroParams {
  id: string;
  cantidad?: number;
  editorial?: string;
  precio_unitario?: number;
  titulo?: string;
  costo_fob?: number;
  id_proveedor?: string;
  id_usuario?: string;
  numero_factura?: string;
  proviene?: string;
}

export interface ICambioEstado {
  razon: string;
  id: string;
  id_usuario: string;
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
