import { AppError } from "../../errors/app-errors";
import type { ICreateEvent } from "./event.interface"
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

export const eventService = {
    createEventIntoDb, getAllEventsFromDb, getEventById
}