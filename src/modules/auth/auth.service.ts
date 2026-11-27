import { pool } from "../../config/db"
import { passwordHelper } from "../../utils/passwordHelper";
import type { IUser } from "./auth.interface"

const signUpIntoDb = async (payload: IUser) => {
    const { name, email, password, role } = payload;
    const hashPass = passwordHelper.hashPass(password)
    const result = await pool.query(`INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING id,name,email,role,created_at,updated_at`, [name, email, hashPass, role])
    return result.rows[0]
}


export const authService = {
    signUpIntoDb
}