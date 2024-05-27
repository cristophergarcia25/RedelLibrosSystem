import { Router } from "express";
import { Cotizacion } from "./module/Cotizacion.js";

const router = Router();

router.post("/cotizacion", async (req, res) => {
  try {
    const cotizacion = new Cotizacion();

    const response = await cotizacion.crearCotizacion(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
