import type { RequestHandler } from "express"
import { apiResponse } from "../../utils/api-response"
import { authService } from "./auth.service"

const register: RequestHandler = async (req, res, next) => {
    try {
        const result = await authService.signUpIntoDb(req.body)
        apiResponse(res, { message: `User Register successfully`, statusCode: 201, data: result, success: true })
    } catch (error) {
        next(error)
    }
}

const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const result = await authService.loginUser(email, password)
        apiResponse(res, { message: `Login successfully`, statusCode: 200, data: result, success: true })
    } catch (error) {
        next(error)
    }
}


export const authController = {
    register, login
}