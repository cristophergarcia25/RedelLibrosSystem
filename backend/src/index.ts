import express, { NextFunction, Request, Response } from "express";
import agregarInstitucion from "../rutas/instituciones/agregarInstitucion";
import actualizarInstitucion from "../rutas/instituciones/actualizarInstitucion";
import borrarInstitucion from "../rutas/instituciones/borrarInstitucion";
import listarInstituciones from "../rutas/instituciones/listarInstituciones";
import agregarLibro from "../rutas/inventario/agregarLibro";
import activarLibro from "../rutas/inventario/activarLibro";
import desactivarLibro from "../rutas/inventario/desactivarLibro";
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
import actualizarConsignacion from "../rutas/consignaciones/actualizarConsignacion";
import listarConsignaciones from "../rutas/consignaciones/listarConsignaciones";
import aprobarConsignacion from "../rutas/consignaciones/aprobarConsignacion";
import denegarConsignacion from "../rutas/consignaciones/denegarConsignacion";
import crearCotizacion from "../rutas/cotizaciones/crearCotizacion";
import listarCotizaciones from "../rutas/cotizaciones/listarCotizaciones";
import aprobarCotizacion from "../rutas/cotizaciones/aprobarCotizacion";
import denegarCotizacion from "../rutas/cotizaciones/denegarCotizacion";
import crearRetaceo from "../rutas/retaceo/crearRetaceo";
import listarRetaceos from "../rutas/retaceo/listarRetaceos";
import crearProveedor from "../rutas/proveedor/crearProveedor";
import actualizarProveedor from "../rutas/proveedor/actualizarProveedor";
import borrarProveedor from "../rutas/proveedor/borrarProveedor";
import listarProveedores from "../rutas/proveedor/listarProveedores";
import listarHistorial from "../rutas/historial/listarHistorial";
import session from "express-session";

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

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // En producción, debería ser true
  })
);

app.use("/", crearUsuario);
app.use("/", obtenerUsuario);
app.use("/", actualizarUsuario);
app.use("/", borrarUsuario);
app.use("/", loginApi);
app.use("/", agregarLibro);
app.use("/", actualizarLibro);
app.use("/", eliminarLibro);
app.use("/", activarLibro);
app.use("/", desactivarLibro);
app.use("/", listarLibros);
app.use("/", obtenerLibro);
app.use("/", agregarInstitucion);
app.use("/", borrarInstitucion);
app.use("/", actualizarInstitucion);
app.use("/", listarInstituciones);
app.use("/", crearConsignacion);
app.use("/", actualizarConsignacion);
app.use("/", listarConsignaciones);
app.use("/", aprobarConsignacion);
app.use("/", denegarConsignacion);
app.use("/", crearCotizacion);
app.use("/", listarCotizaciones);
app.use("/", aprobarCotizacion);
app.use("/", denegarCotizacion);
app.use("/", crearRetaceo);
app.use("/", listarRetaceos);
app.use("/", crearProveedor);
app.use("/", actualizarProveedor);
app.use("/", listarProveedores);
app.use("/", borrarProveedor);
app.use("/", listarHistorial);

app.listen(4000);
console.log("Servidor en puerto", 4000);
