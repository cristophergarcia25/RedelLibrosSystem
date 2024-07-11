export class ErroresCotizacion {
  static COTIZACION_NO_CREADA = {
    error: "Cotizacion no creada",
    detalle: "Ocurrio un error al crear la cotizacion en la base de datos",
  };

  static LIBROS_NO_ENCONTRADOS = {
    error: "No se encontraron libros",
    detalle: "No se encontraron libros que esten activos en la base de datos",
  };

  static COTIZACION_NO_APROBADA = {
    error: "Cotizacion no aprobada",
    detalle: "Ocurrio un error al aprobar la cotizacion en la base de datos",
  };

  static COTIZACION_NO_DENEGADA = {
    error: "Cotizacion no denegada",
    detalle: "Ocurrio un error al denegar la cotizacion en la base de datos",
  };

  static COTIZACIONES_NO_ENCONTRADAS = {
    error: "No existen cotizaciones",
    detalle: "Actualmente no existen cotizaciones",
  };
}
