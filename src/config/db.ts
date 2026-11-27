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
    )
        
    
    `
export const pool = new Pool({
    connectionString: config.dbUrl
})

export const initDB = async () => {
    await pool.query(tableQuery);
    console.log("Database table create")
}