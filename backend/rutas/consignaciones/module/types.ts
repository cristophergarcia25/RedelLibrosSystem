export interface ICrearConsignacionParams {
  id_usuario: string;
  id_institucion: string;
  fecha_corte: string;
  articulos: IDetalleArticulos[];
}

export interface IDetalleArticulos {
  id_inventario: string;
  cantidad: number;
}

export interface IActualizarConsignacionParams {
  id: string;
  fecha_corte?: string;
  id_usuario?: string;
  id_institucion?: string;
}

export interface IAprobarConsignacionParams {
  id_consignacion: string;
  id_usuario: string;
}

export interface IDenegarConsignacionParams {
  id_consignacion: string;
  id_usuario: string;
  detalle: string;
}
