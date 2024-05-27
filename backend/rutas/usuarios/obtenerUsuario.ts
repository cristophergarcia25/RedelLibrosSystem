import { Router } from "express";
import { Usuario } from "./module/Usuario.js";

const router = Router();

router.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = new Usuario();

    const response = await usuario.obtenerUsuario(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
