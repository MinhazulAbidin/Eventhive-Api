import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config"

const tokenGenerate = (payload: JwtPayload) => {
    const expiresIn = config.jwtExpiresIn
    return jwt.sign(payload, config.jwtSecret, expiresIn === undefined ? {} : { expiresIn })
}

const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwtSecret);
};

export const jwtHelpers = { tokenGenerate, verifyToken };