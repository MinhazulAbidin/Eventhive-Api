import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router()

route.post("/register", authController.signUp)

export const authRouter = route