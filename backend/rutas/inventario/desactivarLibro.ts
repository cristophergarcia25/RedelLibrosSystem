import { Router } from "express";
import { Inventario } from "./module/Inventario.js";

const router = Router();

router.put("/inventario/desactivar", async (req, res) => {
  try {
    const inventario = new Inventario();
    const response = await inventario.desactivarLibro(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
