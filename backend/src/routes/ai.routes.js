import { Router } from "express";

import { chatIA }
  from "../controllers/ai.controller.js";

const router = Router();

router.post("/", chatIA);

export default router;