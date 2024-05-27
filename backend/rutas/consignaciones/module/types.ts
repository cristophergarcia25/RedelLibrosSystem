export interface ICrearConsignacionParams {
  id_libro: string;
  cantidad: number;
  estado: string;
  id_usuario: string;
  id_institucion: string;
}

export interface IAprobarConsignacionParams {
  id_consignacion: string;
  id_usuario: string;
}
