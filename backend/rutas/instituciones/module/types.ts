export interface IAgregarInstitucionParams {
  nombre_factura: string;
  direccion_factura: string;
  nit: string;
  registro?: string;
  giro?: string;
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
  nombre_factura?: string;
  direccion_factura?: string;
  nit?: string;
  registro?: string;
  giro?: string;
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
