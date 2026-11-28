import { Router } from "express";
import { bookingController } from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router()

router.post("/", authMiddleware.auth, bookingController.createBooking)
router.get("/", authMiddleware.auth, bookingController.getUserBooking)
router.patch("/:id/cancel", authMiddleware.auth, bookingController.cancelBookings)

export const bookingRouter = router