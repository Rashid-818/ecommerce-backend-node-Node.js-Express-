import { Router } from "express";
import { requireAuth } from "../middlewares/authRequired.js";
import { requireAdmin } from "../middlewares/adminRequired.js";
import { deleteProduct, getOneProduct, getProduct, productCreate } from "../controllers/product.js";

const router = Router()

// User Routes
router.get("/products",getProduct)
router.get("/products/:id",getOneProduct)

// Admin Routes
router.post("/products",requireAuth,requireAdmin,productCreate)
router.delete("/products/:id",requireAuth,requireAdmin,deleteProduct)

export default router