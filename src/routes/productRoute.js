import { Router } from "express";
import { requireAuth } from "../middlewares/authRequired.js";
import { requireAdmin } from "../middlewares/adminRequired.js";
import { productCreate } from "../controllers/product.js";

const router = Router()

router.post("/list-product",requireAuth,requireAdmin,productCreate)

export default router