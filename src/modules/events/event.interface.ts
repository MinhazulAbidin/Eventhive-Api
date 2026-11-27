export interface IEvent {
    id: number;
    title: string;
    description: string;
    category: string;
    date: Date;
    location: string;
    total_seats: number;
    available_seats: number;
    price: number;
    organizer_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface ICreateEvent {
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
    total_seats: number;
    available_seats: number,
    price: number;
}


export interface IUpdateEvent {
    title?: string;
    description?: string;
    category?: string;
    date?: string;
    location?: string;
    total_seats?: number;
    price?: number;
}