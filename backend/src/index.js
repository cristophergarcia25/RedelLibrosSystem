import express from "express";
import crearUsuario from "../rutas/usuarios/crearUsuario.js";
import obtenerUsuario from "../rutas/usuarios/obtenerUsuario.js";
import loginApi from "../rutas/security/loginApi.js";

const app = express();

// Middleware para habilitar CORS
app.use((req, res, next) => {
  // Permitir el acceso desde todos los orígenes
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Permitir los métodos de solicitud que desees
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Permitir los encabezados que desees
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Permitir el envío de cookies desde el navegador
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Continuar con la siguiente capa de middleware
  next();
});

app.use(express.json());

app.use("/", crearUsuario);
app.use("/", obtenerUsuario);
app.use("/", loginApi);

app.listen(4000);
console.log("Servidor en puerto", 4000);
