import { AppError } from "../../errors/app-errors";
import type { ICreateEvent, IUpdateEvent } from "./event.interface"
import { eventRepo } from "./event.repository";

const createEventIntoDb = async (payload: ICreateEvent, organizerId: number) => {
    const result = await eventRepo.createEvent(payload, organizerId);
    return result;
}

const getAllEventsFromDb = async (search: string) => {
    const result = await eventRepo.getAllEvent(search)
    return result
}

const getEventById = async (id: number) => {
    const result = await eventRepo.getSingleEvent(id);

    if (!result) {
        throw new AppError("Event not found", 404);
    }

    return result;
};

const checkEventOwner = async (id: number, organizerId: number) => {
    const event = await eventRepo.getEventOwner(id)
    if (!event) {
        throw new AppError("Event not found", 404)
    }

    if (event.organizer_id !== organizerId) {
        throw new AppError("You are not the owner of this event", 403);
    }
    return event;
}


const updateEventIntoDb = async (payload: IUpdateEvent, id: number, organizerId: number,) => {

    await checkEventOwner(id, organizerId)

    const result = await eventRepo.updateEvent(payload, id)
    return result
}

const deleteEvent = async (id: number, organizerId: number) => {
    await checkEventOwner(id, organizerId)
    const isConfirm = await eventRepo.getConfirmBookingCount(id)

    if (isConfirm > 0) {
        throw new AppError("Cannot delete event with confirmed bookings", 400);
    }

    const result = await eventRepo.deleteEvent(id);
}

export const eventService = {
    createEventIntoDb, getAllEventsFromDb, getEventById, checkEventOwner, updateEventIntoDb, deleteEvent
}