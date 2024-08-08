import { Router } from "express";
import { Historial } from "./module/Historial";
import { activeUser } from "../../middleware/activeUser";
import { Result } from "../../utils/result";
import { ErroresGenericos } from "../../src/errores";

const router = Router();

router.get("/historial/lista", activeUser, async (req, res) => {
  try {
    const historial = new Historial();

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await historial.listarHistorial(req.session.user?.rol);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
