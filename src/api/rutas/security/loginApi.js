import { Router } from "express";
import { Security } from "./module/Security.js";

const router = Router();

router.get("/login", async (req, res) => {
  try {
    const security = new Security();

    const params = req.body;

    const response = await security.login(params);
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

export default router;
