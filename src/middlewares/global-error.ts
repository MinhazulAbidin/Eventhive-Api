
import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-errors";
import { apiResponse } from "../utils/api-response";

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
        apiResponse(res, { statusCode: error.statusCode, message: error.message, success: false });
        return;
    }

    apiResponse(res, { statusCode: 500, message: "Internal Server Error", success: false, })
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: {
            details: []
        }
    });
};
