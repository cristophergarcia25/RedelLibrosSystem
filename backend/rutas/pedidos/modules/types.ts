export interface ICrearPedidoParams {
  id_institucion: string;
  id_usuario_solicita: string;
  fecha_compra: Date;
  fecha_entrega: Date;
  orden_compra: string;
  detalle_articulos: IDetalleArticulos[];
}

export interface ICrearPedidoCotizacionParams {
  id_cotizacion: string;
  fecha_compra: Date;
  fecha_entrega: Date;
  orden_compra: string;
}

export interface IDetalleArticulos {
  id_inventario: string;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
}

export interface IAprobarCotizacionParams {
  id_cotizacion: string;
  id_usuario: string;
}

export interface IDenegarCotizacionParams {
  id_cotizacion: string;
  id_usuario: string;
  detalle: string;
}
