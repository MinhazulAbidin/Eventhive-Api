import type { ICreateEvent } from "./event.interface"
import { eventRepo } from "./event.repository";

const createEventIntoDb = async (payload: ICreateEvent, organizerId: number) => {
    const result = await eventRepo.createEvent(payload, organizerId);
    return result;
}



export const eventService = {
    createEventIntoDb
}