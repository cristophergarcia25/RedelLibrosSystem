import { Router } from "express";
import { Factura } from "./module/Factura.js";

const router = Router();

router.post("/factura", async (req, res) => {
  try {
    const inventario = new Factura();
    const response = await inventario.crearFactura(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
