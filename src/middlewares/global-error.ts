
import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-errors";

export const globalError: ErrorRequestHandler = (
    error,
    req,
    res,
    next
) => {


    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            error: {
                details: error.details
            }
        });

        return;
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: {
            details: []
        }
    });
};
