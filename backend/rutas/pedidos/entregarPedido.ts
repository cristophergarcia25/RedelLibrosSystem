import { Router } from "express";
import { Pedidos } from "./modules/Pedidos.js";

const router = Router();

router.put("/pedido/:id", async (req, res) => {
  try {
    const pedido = new Pedidos();
    const { id } = req.params;
    const response = await pedido.entregarPedido(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
