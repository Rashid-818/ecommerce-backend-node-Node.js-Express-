import { Router } from "express";
import { requireAuth } from "../middlewares/authRequired.js";
import { addToCart } from "../controllers/cart.js";

const router = Router()

router.post("/cart",requireAuth,addToCart)

export default router