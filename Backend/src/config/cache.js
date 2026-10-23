import { createClient } from "redis"

const client = createClient({
    url: process.env.REDIS_URL
});

client.on("connect", () => {
    console.log("Redis connected");
});
client.on("error", (err) => {
    console.log("Redis error:", err.message);
});

await client.connect();

export default client