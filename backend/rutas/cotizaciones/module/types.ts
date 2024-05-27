export interface ICrearCotizacionParams {
  id_institucion: string;
  id_usuario_solicita: string;
  detalle_articulos: IDetalleArticulos[];
}

export interface IDetalleArticulos {
  id_inventario: string;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
}
