import { Router, Request, Response } from "express";
import { Usuario } from "./module/Usuario";
import { activeUser, AuthenticatedRequest } from "../../middleware/activeUser";
import { Result } from "../../utils/result";
import { ErroresGenericos } from "../../src/errores";

const router = Router();

router.post(
  "/usuario",
  activeUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const usuario = new Usuario();
      if (!req.session.user)
        res
          .status(500)
          .json(
            Result.errorOperacion(ErroresGenericos.MIDDLEWARE_NO_ENCONTRADO)
          );

      const response = await usuario.crearUsuario(
        req.body,
        req.session.user.rol
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
