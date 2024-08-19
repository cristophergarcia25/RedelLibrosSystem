import { Router } from "express";
import { Consignaciones } from "./module/Consignaciones.js";
import { activeUser } from "../../middleware/activeUser.js";
import { ErroresGenericos } from "../../src/errores.js";
import { Result } from "../../utils/result.js";

const router = Router();

router.put("/consignaciones/denegar", activeUser, async (req, res) => {
  try {
    const consignaciones = new Consignaciones();

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await consignaciones.denegarConsignacion(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
