import { Router } from "express";
import { getStats } from "../controllers/dashboard.controller.js";

import protect from "../middleware/auth.middleware.js";
import verifyRole from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/",
  protect,
  verifyRole(["admin"]),
  getStats
);

export default router;