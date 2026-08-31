import { Router } from "express";
import { login, profile, signUp } from "../controllers/authUser.js";
import { requireAuth } from "../middlewares/authRequired.js";
import { requireAdmin } from "../middlewares/adminRequired.js";

const router = Router()

router.post("/signup",signUp)
router.post("/login",login)

router.get("/middleware",requireAuth,requireAdmin, profile)


export default router