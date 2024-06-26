import { Router } from "express";
import { Proveedor } from "./modules/Proveedor";

const router = Router();

router.get("/proveedor/lista", async (req, res) => {
  try {
    const proveedor = new Proveedor();

    const response = await proveedor.listarProveedores();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
