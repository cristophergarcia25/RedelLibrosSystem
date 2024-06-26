import { Router } from "express";
import { Retaceo } from "./module/Retaceo";

const router = Router();

router.delete("/retaceo/:id", async (req, res) => {
  try {
    const retaceo = new Retaceo();
    const { id } = req.params;
    const response = await retaceo.borrarRetaceo(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
