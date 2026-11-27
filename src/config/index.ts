import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
}

export default config