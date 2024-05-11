import { Router } from "express";
import { Institucion } from "./module/Institucion";

const router = Router();

router.delete("/institucion:id", async (req, res) => {
  try {
    const institucion = new Institucion();
    const { id } = req.params;
    const response = await institucion.borrarInstitucion(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
