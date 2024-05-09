import { Router } from "express";
import { Inventario } from "./module/Inventario.js";

const router = Router();

router.post("/inventario", async (req, res) => {
  try {
    const inventario = new Inventario();

    const response = await inventario.agregarLibro(req.body);
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

export default router;
