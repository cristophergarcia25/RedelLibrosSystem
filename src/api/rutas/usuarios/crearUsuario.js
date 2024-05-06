import { Router } from "express";
import { Usuario } from "./module/Usuario.js";

const router = Router();

router.post("/usuario", async (req, res) => {
  try {
    const usuario = new Usuario();

    const response = await usuario.crearUsuario(req.body);
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

export default router;
