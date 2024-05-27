import express, { NextFunction, Request, Response } from "express";
import agregarInstitucion from "../rutas/instituciones/agregarInstitucion";
import listarInstituciones from "../rutas/instituciones/listarInstituciones";
import agregarLibro from "../rutas/inventario/agregarLibro";
import actualizarLibro from "../rutas/inventario/actualizarLibro";
import listarLibros from "../rutas/inventario/listarLibros";
import obtenerLibro from "../rutas/inventario/obtenerLibro";
import eliminarLibro from "../rutas/inventario/eliminarLibro";
import loginApi from "../rutas/security/loginApi";
import borrarUsuario from "../rutas/usuarios/borrarUsuario";
import crearUsuario from "../rutas/usuarios/crearUsuario";
import obtenerUsuario from "../rutas/usuarios/obtenerUsuario";
import actualizarUsuario from "../rutas/usuarios/actualizarUsuario";
import crearConsignacion from "../rutas/consignaciones/crearConsignacion";
import listarConsignaciones from "../rutas/consignaciones/listarConsignaciones";
import aprobarConsignacion from "../rutas/consignaciones/aprobarConsignacion";
import crearCotizacion from "../rutas/cotizaciones/crearCotizacion";
import listarCotizaciones from "../rutas/cotizaciones/listarCotizaciones";

const app = express();

// Middleware para habilitar CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  // Permitir el acceso desde todos los orígenes
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Permitir los métodos de solicitud que desees
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Permitir los encabezados que desees
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Permitir el envío de cookies desde el navegador
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // Continuar con la siguiente capa de middleware
  next();
});

app.use(express.json());

app.use("/", crearUsuario);
app.use("/", obtenerUsuario);
app.use("/", actualizarUsuario);
app.use("/", borrarUsuario);
app.use("/", loginApi);
app.use("/", agregarLibro);
app.use("/", actualizarLibro);
app.use("/", eliminarLibro);
app.use("/", listarLibros);
app.use("/", obtenerLibro);
app.use("/", agregarInstitucion);
app.use("/", listarInstituciones);
app.use("/", crearConsignacion);
app.use("/", listarConsignaciones);
app.use("/", aprobarConsignacion);
app.use("/", crearCotizacion);
app.use("/", listarCotizaciones);

app.listen(4000);
console.log("Servidor en puerto", 4000);
