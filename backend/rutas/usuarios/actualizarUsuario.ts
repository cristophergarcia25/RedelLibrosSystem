import { Router } from "express";
import { Usuario } from "./module/Usuario";

const router = Router();

router.patch("/usuario", async (req, res) => {
  try {
    const usuario = new Usuario();

    const response = await usuario.actualizarUsuario(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
