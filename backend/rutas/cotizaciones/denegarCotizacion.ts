import { Router } from "express";
import { Cotizacion } from "./module/Cotizacion.js";

const router = Router();

router.put("/cotizacion/denegar", async (req, res) => {
  try {
    const cotizaciones = new Cotizacion();

    const response = await cotizaciones.denegarCotizacion(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
