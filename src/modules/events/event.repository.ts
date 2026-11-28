import { pool } from "../../config/db";
import type { ICreateEvent, IEvent, IUpdateEvent } from "./event.interface"

interface IEventWithOrganizer extends IEvent {
    organizer: {
        id: number;
        name: string;
        email: string;
    };
}


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

const getSingleEvent = async (id: number) => {
    const result = await pool.query(`SELECT e.*, json_build_object(
        'id',u.id,
        'name',u.name,
        'email',u.email
        ) AS organizer FROM events AS e INNER JOIN users AS u ON e.organizer_id=u.id WHERE e.id=$1`, [id])

    return result.rows[0]
}

const getEventOwner = async (id: number) => {
    const result = await pool.query(`SELECT id,organizer_id FROM events WHERE id=$1`, [id])
    return result.rows[0]
}


const updateEvent = async (payload: IUpdateEvent, id: number) => {
    const { title, description, category, location, date, total_seats, price } = payload
    const result = await pool.query(`UPDATE events 
        SET 
            title=COALESCE($1,title), 
            description=COALESCE($2,description), 
            category=COALESCE($3,category),
            location=COALESCE($4,location), 
            date=COALESCE($5,date),
            total_seats=COALESCE($6,total_seats), 
            price=COALESCE($7,price),
            updated_at = CURRENT_TIMESTAMP
            WHERE id=$8 RETURNING *
          `,
        [title ?? null, description ?? null, category ?? null, location ?? null, date ?? null, total_seats ?? null, price ?? null, id]
    )
    return result.rows[0]
}


const getConfirmBookingCount = async (eventId: number) => {
    const result = pool.query(`
            SELECT COUNT(*)::INT AS count FROM bookings WHERE event_id=$1 AND status='confirmed'
        `, [eventId])
    return (await result).rows[0].count;
}

const deleteEvent = async (id: number) => {
    const result = await pool.query(`
        DELETE FROM events WHERE id=$1 RETURNING *`, [id])

    return result
}

export const eventRepo = {
    createEvent, getAllEvent, getSingleEvent, getEventOwner, updateEvent, getConfirmBookingCount, deleteEvent
}