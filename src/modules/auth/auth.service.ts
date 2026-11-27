import { pool } from "../../config/db"
import { AppError } from "../../errors/app-errors";
import { jwtHelpers } from "../../utils/jwt-helper";
import { passwordHelper } from "../../utils/passwordHelper";
import type { IUser } from "./auth.interface"

const signUpIntoDb = async (payload: IUser) => {
    const { name, email, password, role } = payload;
    const hashPass = passwordHelper.hashPass(password)
    const result = await pool.query(`INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING id,name,email,role,created_at,updated_at`, [name, email, hashPass, role ?? 'attendee'])
    return result.rows[0]
}

const loginUser = async (email: string, password: string) => {
    const existUser = await pool.query<IUser>(`SELECT * FROM users WHERE email=$1`, [email])
    const user = existUser.rows[0]
    if (!user || !passwordHelper.comparePassword(user.password, password)) {
        throw new AppError("Invalid email or password", 401)
    }
    const tokenPayload = { id: user.id, role: user.role }
    const token = jwtHelpers.tokenGenerate(tokenPayload);
    return {
        token, user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}


export const authService = {
    signUpIntoDb, loginUser
}