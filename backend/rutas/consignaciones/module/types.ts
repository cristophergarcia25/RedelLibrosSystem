export interface ICrearConsignacionParams {
  id_libro: string;
  cantidad: number;
  id_usuario: string;
  id_institucion: string;
}

export interface IActualizarConsignacionParams {
  id_consignacion: string;
  id_libro?: string;
  cantidad?: number;
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
