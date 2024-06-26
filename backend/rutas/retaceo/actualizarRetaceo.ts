import { Router } from "express";
import { Retaceo } from "./module/Retaceo";

const router = Router();

router.put("/retaceo", async (req, res) => {
  try {
    const retaceo = new Retaceo();

    const response = await retaceo.actualizarRetaceo(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
