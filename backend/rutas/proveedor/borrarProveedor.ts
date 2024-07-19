import { Router } from "express";
import { Proveedor } from "./modules/Proveedor";
import { ErroresGenericos } from "../../src/errores";
import { Result } from "../../utils/result";
import { activeUser } from "../../middleware/activeUser";

const router = Router();

router.delete("/proveedor/:id", activeUser, async (req, res) => {
  try {
    const proveedor = new Proveedor();
    const { id } = req.params;

    if (!req.session.user)
      res
        .status(500)
        .json(Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO));

    const response = await proveedor.borrarProveedor(id, req.session.user?.rol);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
