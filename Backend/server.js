import 'dotenv/config'
import app from "./src/app.js";
import connectToDb from './src/config/database.js';
import client from './src/config/cache.js';
import dns from "dns"

dns.setServers(["8.8.8.8", "1.1.1.1"])
const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        await connectToDb()
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server:",
            error.message)
        process.exit(1)
    }
} startServer()
