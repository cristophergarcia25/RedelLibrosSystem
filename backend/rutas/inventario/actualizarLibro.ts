import { Router } from "express";
import { Inventario } from "./module/Inventario.js";

const router = Router();

router.patch("/inventario", async (req, res) => {
  try {
    console.log(req.body);
    const inventario = new Inventario();

    const response = await inventario.actualizarLibro(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
