import { pool } from "../../config/db";
import type { ICreateBooking } from "./booking.interface";

const getEventForBooking = async (eventId: number) => {
    const result = await pool.query(
        `SELECT id, organizer_id, date, available_seats, price
        FROM events
        WHERE id = $1`,
        [eventId]
    );

    return result.rows[0];
};

const createBooking = async (payload: ICreateBooking, attendeeId: number, totalPrice: number) => {
    const { event_id, tickets_booked } = payload

    const result = await pool.query(`
        INSERT INTO bookings(
        event_id, attendee_id,tickets_booked,total_price 
        ) VALUES ($1,$2,$3,$4) RETURNING *
         `, [event_id, attendeeId, tickets_booked, totalPrice])

    return result.rows[0]
}

const updateAvailableSeats = async (eventId: number, ticketsBooked: number) => {
    const result = await pool.query(`
    UPDATE events SET
    available_seats = available_seats - $1,
    updated_at=CURRENT_TIMESTAMP 
    WHERE id=$2 AND available_seats >= $1 RETURNING *        
        `, [ticketsBooked, eventId])

    return result.rows[0]
}

export const bookingRepository = {
    getEventForBooking, createBooking, updateAvailableSeats
};