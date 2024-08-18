import { Usuario } from "./module/Usuario";
import { activeUser } from "../../middleware/activeUser.js";
import { Result } from "../../utils/result";
import { ErroresGenericos } from "../../src/errores";
import { Router } from "express";

const router = Router();

router.put("/usuario/desactivar/:id", activeUser, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = new Usuario();

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await usuario.desactivarUsuario(
      id,
      req.session.user?.rol,
      req.session.user?.id
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
