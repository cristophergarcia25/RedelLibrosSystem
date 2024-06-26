import { Router } from "express";
import { Institucion } from "./module/Institucion.js";

const router = Router();

router.put("/institucion", async (req, res) => {
  try {
    const institucion = new Institucion();

    const response = await institucion.actualizarInstitucion(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
