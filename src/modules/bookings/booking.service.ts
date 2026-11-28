import { AppError } from "../../errors/app-errors";
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


export const bookingService = {
    createBooking
};