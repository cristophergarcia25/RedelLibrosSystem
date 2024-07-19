import { Router } from "express";
import { Institucion } from "./module/Institucion.js";
import { ErroresGenericos } from "../../src/errores.js";
import { Result } from "../../utils/result.js";
import { activeUser } from "../../middleware/activeUser.js";

const router = Router();

router.put("/institucion", activeUser, async (req, res) => {
  try {
    const institucion = new Institucion();

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await institucion.actualizarInstitucion(
      req.body,
      req.session.user?.rol
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
