import { Router } from "express";
import { Retenido } from "./module/Retenido.js";

const router = Router();

router.get("/retenido/:id", async (req, res) => {
  try {
    const retenido = new Retenido();
    const { id } = req.params;
    const response = await retenido.getCantidadRetenida(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
