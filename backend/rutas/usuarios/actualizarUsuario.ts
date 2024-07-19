import { Router } from "express";
import { Usuario } from "./module/Usuario";
import { Result } from "../../utils/result";
import { ErroresGenericos } from "../../src/errores";

const router = Router();

router.put("/usuario", async (req, res) => {
  try {
    const usuario = new Usuario();

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await usuario.actualizarUsuario(
      req.body,
      req.session.user?.rol
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
