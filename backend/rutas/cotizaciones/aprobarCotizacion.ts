import { Router } from "express";
import { Cotizacion } from "./module/Cotizacion.js";

const router = Router();

router.patch("/cotizacion/aprobar", async (req, res) => {
  try {
    const cotizaciones = new Cotizacion();

    const response = await cotizaciones.aprobarCotizacion(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
