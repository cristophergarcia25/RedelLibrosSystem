import { Router } from "express";
import { Security } from "./module/Security.js";
import SchemaValidator from "../../middleware/SchemaValidator";

const router = Router();

router.post("/login", SchemaValidator("validate/login"), async (req, res) => {
  try {
    const security = new Security();

    const params = req.body;

    const response = await security.login(params);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
