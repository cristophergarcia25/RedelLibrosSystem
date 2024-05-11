import { Router } from "express";
import { Institucion } from "./module/Institucion.js";

const router = Router();

router.get("/instituciones/lista", async (req, res) => {
  try {
    const institucion = new Institucion();

    const response = await institucion.listarInstituciones();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
