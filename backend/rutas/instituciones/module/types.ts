export interface IAgregarInstitucionParams {
  contacto_principal: string;
  correo_contacto_principal: string;
  cargo_contacto_principal: string;
  direccion: string;
  nombre: string;
  tel_contacto_principal: string;
  contacto_secundario?: string;
  correo_contacto_secundario?: string;
  cargo_contacto_secundario?: string;
  tel_contacto_secundario?: string;
  porcentaje_descuento?: number;
}

export interface IActualizarInstitucionParams {
  id: string;
  contacto_principal?: string;
  correo_contacto_principal: string;
  cargo_contacto_principal: string;
  direccion?: string;
  nombre?: string;
  tel_contacto_principal?: string;
  contacto_secundario?: string;
  correo_contacto_secundario?: string;
  cargo_contacto_secundario?: string;
  tel_contacto_secundario?: string;
  porcentaje_descuento?: number;
}
