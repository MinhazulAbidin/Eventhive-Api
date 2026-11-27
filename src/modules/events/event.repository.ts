import { pool } from "../../config/db";
import type { ICreateEvent } from "./event.interface"

const createEvent = async (payload: ICreateEvent, organizer_id: number) => {
    const { title, description, category, date, location, total_seats, price } = payload;

    const result = await pool.query(`
        INSERT INTO events
        (title, description, category, date, location, total_seats,available_seats, price,organizer_id) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
        [title, description, category, date, location, total_seats, total_seats, price, organizer_id]
    )

    return result.rows[0]
}


const getAllEvent = async (search: string) => {
    let sql = `SELECT * FROM events`;
    let params: any[] = [];
    if (search) {
        sql = `SELECT * FROM events WHERE title ILIKE $1 OR description ILIKE $1 ORDER BY created_at DESC`;
        params = [`%${search}%`]
    }
    const result = await pool.query(sql, params)
    return result.rows
}

export const eventRepo = {
    createEvent, getAllEvent
}