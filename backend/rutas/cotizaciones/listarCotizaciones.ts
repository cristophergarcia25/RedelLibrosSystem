import { Router } from "express";
import { Cotizacion } from "./module/Cotizacion.js";
import { activeUser } from "../../middleware/activeUser.js";
import { Result } from "../../utils/result.js";
import { ErroresGenericos } from "../../src/errores.js";

const router = Router();

router.get("/cotizacion/lista", activeUser, async (req, res) => {
  try {
    const cotizaciones = new Cotizacion();

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await cotizaciones.listarCotizaciones(
      req.session.user?.rol
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
