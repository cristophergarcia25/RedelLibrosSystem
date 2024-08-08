export interface ICrearFacturaParams {
  num_factura: string;
  tipo_documento: string;
  id_institucion: string;
  id_usuario: string;
  articulos: IDetalleArticulos[];
}

export interface IDetalleArticulos {
  id_inventario: string;
  cantidad: number;
}
