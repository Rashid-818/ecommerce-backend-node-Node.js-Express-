import { Router } from "express";
import { login, profile, signUp } from "../controllers/authUser.js";
import { requireAuth } from "../middlewares/authRequired.js";

const router = Router()

router.post("/signup",signUp)
router.post("/login",login)

router.get("/middleware",requireAuth, profile)


export default router