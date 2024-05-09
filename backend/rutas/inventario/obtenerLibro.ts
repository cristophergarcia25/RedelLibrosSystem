import { Router } from "express";
import { Inventario } from "./module/Inventario.js";

const router = Router();

router.get("/inventario/libro/:isbn", async (req, res) => {
  try {
    const inventario = new Inventario();
    const { isbn } = req.params;
    const response = await inventario.obtenerLibro(isbn);
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

export default router;
