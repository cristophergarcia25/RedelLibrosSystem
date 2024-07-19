import { Router } from "express";
import { Institucion } from "./module/Institucion";
import { ErroresGenericos } from "../../src/errores";
import { Result } from "../../utils/result";

const router = Router();

router.delete("/institucion:id", async (req, res) => {
  try {
    const institucion = new Institucion();
    const { id } = req.params;

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await institucion.borrarInstitucion(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
