import { Router } from "express";
import { Inventario } from "./module/Inventario.js";
import { activeUser } from "../../middleware/activeUser.js";
import { ErroresGenericos } from "../../src/errores.js";
import { Result } from "../../utils/result.js";

const router = Router();

router.put("/inventario", activeUser, async (req, res) => {
  try {
    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const inventario = new Inventario();

    const response = await inventario.actualizarLibro(
      req.body,
      req.session.user?.id
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
