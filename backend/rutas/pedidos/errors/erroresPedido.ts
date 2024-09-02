export class ErroresPedido {
  static PEDIDO_NO_CREADO = {
    error: "Pedido no creado",
    detalle: "Ocurrio un error al crear el pedido en la base de datos",
  };

  static COTIZACION_NO_ENCONTRADA = {
    error: "Cotizacion no encontrada",
    detalle: "No se encontraron datos de la cotizacion a usar para el pedido",
  };
}
