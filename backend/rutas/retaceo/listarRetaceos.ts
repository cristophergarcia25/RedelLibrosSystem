import { Router } from "express";
import { Retaceo } from "./module/Retaceo";

const router = Router();

router.get("/retaceo/lista", async (req, res) => {
  try {
    const retaceo = new Retaceo();

    const response = await retaceo.listarRetaceos();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
