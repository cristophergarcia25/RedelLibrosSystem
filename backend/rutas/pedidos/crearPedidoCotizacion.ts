import { Router } from "express";
import { Pedidos } from "./modules/Pedidos.js";

const router = Router();

router.post("/pedidoCotizacion", async (req, res) => {
  try {
    const pedido = new Pedidos();

    const response = await pedido.crearPedido(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
