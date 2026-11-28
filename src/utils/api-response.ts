import type { Response } from "express";

interface ApiResponse<T> {
    statusCode?: number;
    message: string;
    data?: T | null;
    success: boolean;
    error?: unknown;
}

export const apiResponse = <T>(
    res: Response,
    payload: ApiResponse<T>
) => {
    const {
        statusCode = 200,
        message,
        success,
        data,
        error
    } = payload;

    return res.status(statusCode).json({
        success,
        message,
        ...(data !== undefined && { data }),
        ...(error != null && { error })
    });
};
