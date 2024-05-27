import { Router } from "express";
import { Consignaciones } from "./module/Consignaciones.js";

const router = Router();

router.post("/consignaciones", async (req, res) => {
  try {
    const consignaciones = new Consignaciones();

    const response = await consignaciones.crearConsignacion(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
