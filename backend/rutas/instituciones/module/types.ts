export interface IAgregarInstitucionParams {
  contacto_principal: string;
  direccion: string;
  nombre: string;
  tel_contacto_principal: string;
  contacto_secundario?: string;
  tel_contacto_secundario?: string;
  porcentaje_descuento?: number;
}

export interface IActualizarInstitucionParams {
  id: string;
  contacto_principal?: string;
  direccion?: string;
  nombre?: string;
  tel_contacto_principal?: string;
  contacto_secundario?: string;
  tel_contacto_secundario?: string;
  porcentaje_descuento?: number;
}
