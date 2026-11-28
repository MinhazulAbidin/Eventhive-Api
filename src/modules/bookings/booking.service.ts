import { AppError } from "../../errors/app-errors";
import { eventService } from "../events/event.service";
import type { ICreateBooking } from "./booking.interface";
import { bookingRepository } from "./booking.repository";

const createBooking = async (payload: ICreateBooking, attendeeId: number) => {
    const { event_id, tickets_booked } = payload;

    const event = await bookingRepository.getEventForBooking(event_id)

    if (!event) {
        throw new AppError("Event not found", 404)
    }

    if (event.organizer_id === attendeeId) {
        throw new AppError("You cannot book your own event", 403);
    }

    if (event.available_seats < tickets_booked) {
        throw new AppError("Insufficient available seats for this event", 400);
    }
    const totalPrice = Number(event.price) * tickets_booked;

    const updateEvent = await bookingRepository.updateAvailableSeats(event_id, tickets_booked);

    if (!updateEvent) {
        throw new AppError("Insufficient available seats for this event", 400);
    }
    const result = await bookingRepository.createBooking(payload, attendeeId, totalPrice)

    return result
}

const getUserBookings = async (attendeeId: number) => {
    const result = await bookingRepository.getOneUserBookings(attendeeId);

    return result;
};

const cancelBooking = async (bookingId: number, attendeeId: number) => {
    const booking = await bookingRepository.getBookingForCancel(bookingId);

    if (!booking) {
        throw new AppError("Booking is not found", 404)
    }

    if (booking.attendee_id !== attendeeId) {
        throw new AppError("You are not allowed to cancel this booking", 403)
    }

    if (booking.status === "cancelled") {
        throw new AppError("Booking already cancelled", 409)
    }

    if (new Date(booking.date).getTime() <= Date.now()) {
        throw new AppError("Cannot cancel booking after event has started", 400);
    }

    const result = await bookingRepository.updateBookingStatus(bookingId)

    await bookingRepository.restoreAvailableSeats(booking.event_id, booking.tickets_booked);
    return result
}

export const bookingService = {
    createBooking, getUserBookings, cancelBooking
};