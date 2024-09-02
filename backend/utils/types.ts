export interface IResult<T> {
  error?: string;
  detalle?: string;
  data: T;
  success: boolean;
}

export interface IErrorGenerico {
  error: string;
  detalle: string;
}

export enum ERoles {
  ADMIN = "Admin",
  AUXILIAR_ADMIN = "Auxiliar Administrador",
  VENDEDOR = "Vendedor",
  BODEGA = "Bodega",
}

export enum EAccionHistorial {
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
  APROBADO = "Aprobado",
  DENEGADO = "Denegado",
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
  PEDIDO = "Pedido",
}
