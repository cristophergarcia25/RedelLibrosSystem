import { Router } from "express";
import { Historial } from "./module/Historial";

const router = Router();

router.get("/historial/lista", async (req, res) => {
  try {
    const historial = new Historial();

    const response = await historial.listarHistorial();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
