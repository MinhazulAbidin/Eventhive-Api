import type { Response } from "express";

interface ApiResponseTypes<T> {
    statusCode?: number;
    message: string;
    data?: T;
}

export const apiResponse = <T>(res: Response, payload: ApiResponseTypes<T>) => {
    const {
        statusCode = 200,
        message,
        data = null
    } = payload;

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};
