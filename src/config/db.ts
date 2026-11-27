import { Pool } from "pg";
import config from ".";


const tableQuery =
    `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) CHECK(role IN ('attendee', 'organizer')) DEFAULT 'attendee',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS events(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        date TIMESTAMP NOT NULL,
        location VARCHAR(255) NOT NULL,
        total_seats INT NOT NULL CHECK(total_seats>0),
        available_seats INT NOT NULL CHECK(available_seats >= 0 AND available_seats <=total_seats),
        price NUMERIC(10,2) NOT NULL CHECK(price>=0),
        organizer_id INT NOT NULL REFERENCES users(id),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `
export const pool = new Pool({
    connectionString: config.dbUrl
})

export const initDB = async () => {
    await pool.query(tableQuery);
    console.log("Database table create")
}