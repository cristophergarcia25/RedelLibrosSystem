import { Router } from "express";
import { Proveedor } from "./modules/Proveedor";
import { activeUser } from "../../middleware/activeUser";
import { Result } from "../../utils/result";
import { ErroresGenericos } from "../../src/errores";

const router = Router();

router.put("/proveedor", activeUser, async (req, res) => {
  try {
    const proveedor = new Proveedor();

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await proveedor.actualizarProveedor(
      req.body,
      req.session.user?.rol
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
