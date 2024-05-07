import { Router } from "express";
import { Institucion } from "./module/Institucion.js";

const router = Router();

router.post("/institucion", async (req, res) => {
  try {
    const institucion = new Institucion();

    const response = await institucion.agregarInstitucion(req.body);
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

export default router;
