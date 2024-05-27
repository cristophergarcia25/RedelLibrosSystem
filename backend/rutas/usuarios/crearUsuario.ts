import { Router, Request, Response } from "express";
import { Usuario } from "./module/Usuario";

const router = Router();

router.post("/usuario", async (req: Request, res: Response) => {
  try {
    const usuario = new Usuario();

    const response = await usuario.crearUsuario(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
