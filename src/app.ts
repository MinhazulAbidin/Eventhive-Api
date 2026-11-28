import express, { type Request, type Response } from "express";
import cors from "cors";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { globalError } from "./middlewares/global-error";
import { authRouter } from "./modules/auth/auth.route";
import { eventRoute } from "./modules/events/event.route";
import { bookingRouter } from "./modules/bookings/booking.route";

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/events", eventRoute)
app.use("/api/v1/bookings", bookingRouter)


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "EventHive API is running!"
    })
});


app.use(notFoundHandler);
app.use(globalError);


export default app;