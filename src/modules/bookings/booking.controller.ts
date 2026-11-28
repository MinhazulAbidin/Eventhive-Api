import type { RequestHandler } from "express";
import { AppError } from "../../errors/app-errors";
import { bookingService } from "./booking.service";
import { apiResponse } from "../../utils/api-response";

const createBooking: RequestHandler = async (req, res, next) => {
    try {
        const { event_id, tickets_booked } = req.body;

        if (!Number.isInteger(event_id) || event_id <= 0 || !Number.isInteger(tickets_booked) || tickets_booked <= 0) {
            throw new AppError("Invalid booking information", 400);
        }

        if (!req.user) {
            throw new AppError("Unauthorized access", 401);
        }

        const result = await bookingService.createBooking({ event_id, tickets_booked }, req.user.id)

        return apiResponse(res, {
            success: true,
            statusCode: 201,
            message: "Tickets booked successfully",
            data: result
        });

    } catch (error) {
        next(error)
    }

}


const getUserBooking: RequestHandler = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError("Unauthorized access", 401);
        }
        const result = await bookingService.getUserBookings(req.user.id);

        return apiResponse(res, {
            success: true,
            statusCode: 200,
            message: "Bookings retrieved successfully",
            data: result
        });

    } catch (error) {
        next(error)
    }
}

const cancelBookings: RequestHandler = async (req, res, next) => {
    try {
        const bookingId = Number(req.params.id);

        if (!Number.isInteger(bookingId) || bookingId <= 0) {
            throw new AppError("Invalid booking id.", 400)
        }

        if (!req.user) {
            throw new AppError("Unauthorized access", 401);
        }

        const result = await bookingService.cancelBooking(bookingId, req.user.id)

        return apiResponse(res, {
            success: true,
            statusCode: 200,
            message: "Booking cancelled successfully",
            data: result
        });

    } catch (error) {
        next(error)
    }
}

export const bookingController = {
    createBooking, getUserBooking, cancelBookings
};