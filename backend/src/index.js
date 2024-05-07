import express from "express";
import crearUsuario from "../rutas/usuarios/crearUsuario.js";
import obtenerUsuario from "../rutas/usuarios/obtenerUsuario.js";
import loginApi from "../rutas/security/loginApi.js";
import agregarLibro from "../rutas/inventario/agregarLibro.js";
import listarLibros from "../rutas/inventario/listarLibros.js";
import obtenerLibro from "../rutas/inventario/obtenerLibro.js";
import agregarInstitucion from "../rutas/instituciones/agregarInstitucion.js";
import listarInstituciones from "../rutas/instituciones/listarInstituciones.js";

const app = express();

// Middleware para habilitar CORS
app.use((req, res, next) => {
  // Permitir el acceso desde todos los orígenes
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Permitir los métodos de solicitud que desees
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Permitir los encabezados que desees
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Permitir el envío de cookies desde el navegador
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Continuar con la siguiente capa de middleware
  next();
});

app.use(express.json());

app.use("/", crearUsuario);
app.use("/", obtenerUsuario);
app.use("/", loginApi);
app.use("/", agregarLibro);
app.use("/", listarLibros);
app.use("/", obtenerLibro);
app.use("/", agregarInstitucion);
app.use("/", listarInstituciones);

app.listen(4000);
console.log("Servidor en puerto", 4000);
