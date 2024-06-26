import { Router } from "express";
import { Proveedor } from "./modules/Proveedor";

const router = Router();

router.delete("/proveedor/:id", async (req, res) => {
  try {
    const proveedor = new Proveedor();
    const { id } = req.params;
    const response = await proveedor.borrarProveedor(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
