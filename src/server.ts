import app from "./app"
import config from "./config"
import { initDB } from "./database/db"

const main = () => {
    app.listen(config.port, () => {

        try {

            initDB()
            console.log(`Server is running on ${config.port}`)
        } catch (error) {
            console.error("Failed to connect server", error);
        }
    })
}

main()