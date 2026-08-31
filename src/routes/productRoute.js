import { Router } from "express";
import { requireAuth } from "../middlewares/authRequired.js";
import { requireAdmin } from "../middlewares/adminRequired.js";
import { getOneProduct, getProduct, productCreate } from "../controllers/product.js";

const router = Router()

router.post("/products",requireAuth,requireAdmin,productCreate)
router.get("/products",getProduct)
router.get("/products/:id",getOneProduct)

export default router