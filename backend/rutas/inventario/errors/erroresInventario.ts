export class ErroresInventario {
  static INVENTARIO_NO_AGREGADO = {
    error: "Libro no creado",
    detalle: "Ocurrio un error al agregar el libro en la base de datos",
  };

  static LIBRO_NO_ACTUALIZADO = {
    error: "Libro no actualizado",
    detalle: "Hubo un problema actualizando el libro",
  };

  static INVENTARIO_NO_ENCONTRADO = {
    error: "Inventario no existe",
    detalle: "No se encontro inventario en la base de datos",
  };

  static LIBRO_NO_ENCONTRADO = {
    error: "No se encontro el libro",
    detalle: "El id no coincide con ningun libro",
  };

  static LIBRO_NO_ELIMINADO = {
    error: "Libro no eliminado",
    detalle: "Ocurrio un error eliminando el libro de la base de datos",
  };

  static INVENTARIO_ERROR_ESTADO = {
    error: "Estado no actualizado",
    detalle: "Ocurrio un error cambiando el estado del libro",
  };
}
