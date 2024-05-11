import { Router } from "express";
import { Inventario } from "./module/Inventario.js";

const router = Router();

router.delete("/inventario/libro/:id", async (req, res) => {
  try {
    const inventario = new Inventario();
    const { id } = req.params;
    const response = await inventario.eliminarLibro(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
