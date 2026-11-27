import type { NextFunction, RequestHandler, Request, Response } from "express";
import { AppError } from "../errors/app-errors";
import { jwtHelpers } from "../utils/jwt-helper";
import type { IAuthUser } from "../modules/auth/auth.interface";

const auth: RequestHandler = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError("Unauthorized access!!", 401)
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader
        if (!token) {
            throw new AppError("Unauthorized access!!", 401)
        }
        const decode = jwtHelpers.verifyToken(token)
        if (typeof decode === "string" || typeof decode.id !== "number" || (decode.role !== "attendee" && decode.role !== "organizer")) {
            throw new AppError("Unauthorized access!!", 401)
        }

        req.user = {
            id: decode.id,
            role: decode.role
        } as IAuthUser

        next()
    } catch (error) {
        next(
            error instanceof AppError
                ? error
                : new AppError("Invalid or expired token", 401)
        );
    }
}

const authorizedRoles = (...roles: IAuthUser["role"][]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new AppError("Forbidden access denied", 403)
        }
        next()
    }
}

export const authMiddleware = {
    auth, authorizedRoles
};