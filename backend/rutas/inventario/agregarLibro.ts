import { Router } from "express";
import { Inventario } from "./module/Inventario.js";
import { activeUser } from "../../middleware/activeUser.js";

const router = Router();

router.post("/inventario", activeUser, async (req, res) => {
  try {
    const inventario = new Inventario();
    const response = await inventario.agregarLibro(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
