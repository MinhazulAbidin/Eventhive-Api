import { pool } from "../../config/db"
import type { IUser } from "./auth.intarface"

const signUpIntoDb = async (payload: IUser) => {
    const { name, email, password, role } = payload;
    const result = await pool.query(`INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING id,name,email,role,created_at,updated_at`, [name, email, password, role])
}


export const authService = {
    signUpIntoDb
}