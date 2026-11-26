import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-errors";


export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    next(
        new AppError(
            `Route ${req.method} ${req.originalUrl} not found`,
            404
        )
    );
};
