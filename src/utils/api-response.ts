import type { Response } from "express";

interface ApiResponseTypes<T> {
    statusCode?: number;
    message: string;
    data?: T;
    success: boolean
    error?: any
}

export const apiResponse = <T>(res: Response, payload: ApiResponseTypes<T>) => {
    const {
        statusCode = 200,
        message,
        success,
        data = null,
        error = null
    } = payload;

    return res.status(statusCode).json({
        success,
        message,
        data,
        error
    });
};
