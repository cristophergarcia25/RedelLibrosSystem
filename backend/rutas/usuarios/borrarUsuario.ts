import { Router } from "express";
import { Usuario } from "./module/Usuario";
import { activeUser } from "../../middleware/activeUser";
import { Result } from "../../utils/result";
import { ErroresGenericos } from "../../src/errores";

const router = Router();

router.delete("/usuario/:id", activeUser, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = new Usuario();

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await usuario.borrarUsuario(id, req.session.user?.rol);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
