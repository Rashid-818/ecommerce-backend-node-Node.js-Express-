import { Router } from "express";
import { requireAuth } from "../middlewares/authRequired.js";
import { addToCart, getMyCart } from "../controllers/cart.js";

const router = Router()

router.post("/cart",requireAuth,addToCart)
router.get("/cart",requireAuth,getMyCart)

export default router