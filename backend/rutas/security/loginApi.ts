import express, { Router } from "express";
import session from "express-session";
import SchemaValidator from "../../middleware/SchemaValidator";
import { Security } from "./module/Security";
import { activeUser, AuthenticatedRequest } from "../../middleware/activeUser";

const router = Router();

// Ruta de login
router.post("/login", SchemaValidator("validate/login"), async (req, res) => {
  try {
    const security = new Security();
    const params = req.body;
    const response = await security.login(params);

    // Guardar el usuario en la sesión
    req.session.user = response.data;

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Ruta protegida que usa el middleware de autenticación
router.get("/protected", activeUser, (req: AuthenticatedRequest, res) => {
  res.status(200).json({ message: `Hello ${req.user?.username}` });
});

export default router;
