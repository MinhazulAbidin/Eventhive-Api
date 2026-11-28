import { Router } from "express";
import { bookingController } from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router()

router.post("/", authMiddleware.auth, bookingController.createBooking)

export const bookingRouter = router