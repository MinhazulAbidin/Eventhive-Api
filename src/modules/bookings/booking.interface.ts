export interface IBooking {
    id: number;
    event_id: number;
    attendee_id: number;
    tickets_booked: number;
    total_price: string;
    status: "confirmed" | "cancelled";
    created_at: Date;
    updated_at: Date;
}

export interface ICreateBooking {
    event_id: number;
    tickets_booked: number;
}

export interface IBookingEvent {
    id: number;
    organizer_id: number;
    date: Date;
    available_seats: number;
    price: string;
}

export interface IBookingHistory {
    id: number,
    event: {
        id: number,
        title: string,
        date: Date;
        location: string;
    },
    tickets_booked: number;
    total_price: string;
    status: "confirmed" | "cancelled";
    created_at: Date;
}