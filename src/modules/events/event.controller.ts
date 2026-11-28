import type { RequestHandler } from "express"
import { eventService } from "./event.service"
import { AppError } from "../../errors/app-errors"
import { apiResponse } from "../../utils/api-response";

const createEvent: RequestHandler = async (req, res, next) => {
    try {

        if (!req.user) {
            throw new AppError("Unauthorized access", 401);
        }

        const result = await eventService.createEventIntoDb(req.body, req.user.id)
        return apiResponse(res, {
            success: true,
            statusCode: 201,
            message: "New event create successfully",
            data: result
        })

    } catch (error) {
        next(error)
    }
}
const getAllEvent: RequestHandler = async (req, res, next) => {
    try {
        const search =
            typeof req.query.search === "string"
                ? req.query.search
                : undefined;
        const result = await eventService.getAllEventsFromDb(search as string)
        apiResponse(res, {
            success: true,
            statusCode: 200,
            message: "All events fetch successfully!!",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
const getSingleEvent: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid event ID", 400);
        }
        const result = await eventService.getEventById(id);
        apiResponse(res, {
            success: true,
            statusCode: 200,
            message: "Event retrieved successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
const updateEvent: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid event ID", 400);
        }
        if (!req.user) {
            throw new AppError("Unauthorized access", 401);
        }
        const result = await eventService.updateEventIntoDb(req.body, id, Number(req.user.id))
        apiResponse(res, {
            success: true,
            statusCode: 200,
            message: "Event update successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
const deleteEvent: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("Invalid event ID", 400);
        }

        if (!req.user) {
            throw new AppError("Unauthorized access", 401);
        }

        await eventService.deleteEvent(id, req.user.id);

        return apiResponse(res, {
            success: true,
            statusCode: 200,
            message: "Event deleted successfully",
            data: null
        });
    } catch (error) {
        next(error)
    }
}


export const eventController = {
    createEvent, deleteEvent, getSingleEvent, getAllEvent, updateEvent
}