import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "EventHive API is running!"
    })
})


export default app;