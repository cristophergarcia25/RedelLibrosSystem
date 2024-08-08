import { Router } from "express";
import { Factura } from "./module/Factura";
import { activeUser } from "../../middleware/activeUser";

const router = Router();

router.get("/factura/lista", activeUser, async (req, res) => {
  try {
    const factura = new Factura();

    const response = await factura.listarFacturas();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
