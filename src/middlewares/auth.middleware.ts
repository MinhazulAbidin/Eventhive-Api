import type { NextFunction, RequestHandler, Request, Response } from "express";
import { AppError } from "../errors/app-errors";
import { apiResponse } from "../utils/api-response";
import { jwtHelpers } from "../utils/jwt-helper";
import type { IAuthUser } from "../modules/auth/auth.interface";

const auth: RequestHandler = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return apiResponse(res, { success: false, statusCode: 401, message: "Unauthorized access!!" })
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader
        if (!token) {
            return apiResponse(res, { success: false, statusCode: 401, message: "Unauthorized access!!" })
        }
        const decode = jwtHelpers.verifyToken(token)
        if (typeof decode === "string" || typeof decode.id !== "number" || (decode.role !== "attendee" && decode.role !== "organizer")) {
            return apiResponse(res, { success: false, statusCode: 401, message: "Unauthorized access!!" })
        }

        req.users = {
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

const authorizedRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.users || !roles.includes(req.users.role)) {
            return apiResponse(res, { success: false, statusCode: 403, message: "Forbidden access denied!!" })
        }
        next()
    }
}

export const authMiddleware = {
    auth, authorizedRoles
};