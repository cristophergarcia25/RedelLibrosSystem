export class ErroresFactura {
  static LIBROS_NO_ENCONTRADOS = {
    error: "No se encontraron libros",
    detalle:
      "Los libros proveidos no existen o no se cuenta con la cantidad disponible",
  };

  static FACTURA_NO_CREADA = {
    error: "Factura no creada",
    detalle: "Ocurrio un error al crear factura en la base de datos",
  };
}
