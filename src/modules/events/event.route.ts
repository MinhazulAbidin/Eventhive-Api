import { Router } from "express";
import { eventController } from "./event.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const route = Router()

route.post("/", authMiddleware.auth, authMiddleware.authorizedRoles("organizer"), eventController.createEvent)
route.get("/", eventController.getAllEvent)

export const eventRoute = route;