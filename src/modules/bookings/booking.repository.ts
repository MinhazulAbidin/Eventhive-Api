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

const getOneUserBookings = async (attendeeId: number) => {
    const result = await pool.query(`
        SELECT b.id,
        json_build_object(
            'id',e.id,
            'title', e.title,
            'date', e.date,
            'location', e.location
        ) AS events,
            b.tickets_booked,
            b.total_price,
            b.status,
            b.created_at
        FROM bookings AS b INNER JOIN events AS e ON b.event_id = e.id WHERE b.attendee_id = $1 ORDER BY b.created_at DESC`, [attendeeId])
    return result.rows
}

const getBookingForCancel = async (bookingId: number) => {
    const result = await pool.query(
        `SELECT
            b.id,
            b.event_id,
            b.attendee_id,
            b.tickets_booked,
            b.total_price,
            b.status,
            e.date
        FROM bookings AS b
        INNER JOIN events AS e
            ON b.event_id = e.id
        WHERE b.id = $1`,
        [bookingId]
    );

    return result.rows[0];
};

const updateBookingStatus = async (bookingId: number) => {
    const result = await pool.query(`
    UPDATE bookings SET
        status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`, [bookingId])
    return result.rows[0]
}

const restoreAvailableSeats = async (eventId: number, ticketsBooked: number) => {
    const result = await pool.query(`
        UPDATE events SET
        available_seats = available_seats + $1,
        updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`, [ticketsBooked, eventId])

    return result.rows[0]
}


export const bookingRepository = {
    getEventForBooking, createBooking, updateAvailableSeats, getOneUserBookings, getBookingForCancel, updateBookingStatus, restoreAvailableSeats
};