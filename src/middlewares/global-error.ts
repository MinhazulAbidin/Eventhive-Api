
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
        return apiResponse(res, {
            success: false,
            statusCode: error.statusCode,
            message: error.message,
            error: {
                statusCode: error.statusCode,
                details: error.details
            }
        });
    }

    if (error.code === "23505") {
        return apiResponse(res, {
            success: false,
            statusCode: 409,
            message: "Email already exists",
            error: {
                statusCode: 409,
                details: []
            }
        });
    }

    return apiResponse(res, {
        success: false,
        statusCode: 500,
        message: "Internal server error",
        error: {
            statusCode: 500,
            details: []
        }
    });
};
