import type { RequestHandler } from "express"
import { apiResponse } from "../../utils/api-response"
import { authService } from "./auth.service"

const signUp: RequestHandler = async (req, res) => {
    try {
        const result = await authService.signUpIntoDb(req.body)
    } catch (error: any) {
        apiResponse(res, error)
    }
}


export const authController = {
    signUp
}