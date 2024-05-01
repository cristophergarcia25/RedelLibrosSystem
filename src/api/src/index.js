import express from "express";
import crearUsuario from "../rutas/usuarios/crearUsuario.js";
import obtenerUsuario from "../rutas/usuarios/obtenerUsuario.js";

const app = express();

app.use(express.json());

app.use("/api", crearUsuario);
app.use("/api", obtenerUsuario);

app.listen(4000);
console.log("Servidor en puerto", 4000);
