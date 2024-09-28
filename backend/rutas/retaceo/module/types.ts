export interface ICrearRetaceoParams {
  id_usuario: string;
  fac: string;
  id_proveedor: string;
  descripcion: string;
  parcial: number;
  cheque?: string;
  total?: number;
}

export interface IActualizarRetaceoParams {
  id: string;
  id_usuario?: string;
  fac?: string;
  id_proveedor?: string;
  descripcion?: string;
  parcial?: number;
  cheque?: string;
  total?: number;
}
