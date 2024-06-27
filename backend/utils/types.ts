export interface IResult<T> {
  error?: string;
  detalle?: string;
  data: T;
  success: boolean;
}

export enum EAccionHistorial {
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
}

export enum ERecursos {
  INVENTARIO = "Inventario",
  CONSIGNACION = "Consignacion",
  INSTITUCION = "Institucion",
  PROVEEDOR = "Proveedor",
  RETACEO = "Retaceo",
  FACTURA = "Factura",
  COTIZACION = "Cotizacion",
  USUARIO = "Usuario",
}
