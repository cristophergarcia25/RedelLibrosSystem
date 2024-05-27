import { Router } from "express";
import { Cotizacion } from "./module/Cotizacion.js";

const router = Router();

router.get("/cotizacion/lista", async (req, res) => {
  try {
    const cotizaciones = new Cotizacion();

    const response = await cotizaciones.listarCotizaciones();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
