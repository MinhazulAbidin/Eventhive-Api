import { pool } from "../../config/db";
import type { ICreateEvent } from "./event.interface"

const createEvent = async (payload: ICreateEvent, organizer_id: number) => {
    const { title, description, category, date, location, total_seats, available_seats, price } = payload;
    const result = await pool.query(`INSERT INTO events(title, description, category, date, location, total_seats,available_seats, price,organizer_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [title, description, category, date, location, total_seats, available_seats, price, organizer_id])
    return result.rows[0]
}

export const eventRepo = {
    createEvent
}