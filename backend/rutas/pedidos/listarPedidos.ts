import { Router } from "express";
import { Pedidos } from "./modules/Pedidos.js";

const router = Router();

router.get("/pedido/lista", async (req, res) => {
  try {
    const pedido = new Pedidos();

    const response = await pedido.listarPedidos();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
