import { Router } from "express";
import { requireAuth } from "../middlewares/authRequired.js";
import { requireAdmin } from "../middlewares/adminRequired.js";
import { getProduct, productCreate } from "../controllers/product.js";

const router = Router()

router.post("/list-product",requireAuth,requireAdmin,productCreate)
router.get("/product",requireAuth,getProduct)

export default router