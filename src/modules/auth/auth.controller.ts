import type { RequestHandler } from "express"
import { apiResponse } from "../../utils/api-response"
import { authService } from "./auth.service"

const register: RequestHandler = async (req, res) => {
    try {
        const result = await authService.signUpIntoDb(req.body)
        apiResponse(res, { message: "User Register successfully", statusCode: 200, data: result, success: true })
    } catch (error: any) {
        apiResponse(res, { success: false, message: error.message, statusCode: 500 })
    }
}


export const authController = {
    register
}