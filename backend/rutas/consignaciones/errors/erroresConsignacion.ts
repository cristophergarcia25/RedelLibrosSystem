export class ErroresConsignacion {
  static LIBROS_NO_ENCONTRADOS = {
    error: "No se encontraron libros",
    detalle:
      "Los libros proveidos no existen o no se cuenta con la cantidad disponible",
  };

  static CONSIGNACION_NO_CREADA = {
    error: "Consignacion no creada",
    detalle: "Ocurrio un error al crear la consignacion en la base de datos",
  };

  static CONSIGNACION_NO_ACTUALIZADA = {
    error: "Consignacion no actualizada",
    detalle:
      "Ocurrio un error al actualizar la consignacion en la base de datos",
  };
}
