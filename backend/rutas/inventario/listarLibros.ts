import { Router } from "express";
import { Inventario } from "./module/Inventario.js";

const router = Router();

router.get("/inventario/lista", async (req, res) => {
  try {
    const inventario = new Inventario();

    const response = await inventario.listarLibros();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
