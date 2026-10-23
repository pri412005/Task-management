import jwt from "jsonwebtoken"
import client from "../config/cache.js"
export async function finduser(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            })
        }
        const isBlacklisted = await client.get(`blacklist:${token}`);
        if (isBlacklisted) {
            return res.status(403).json({ message: 'Token has been revoked. Please log in again.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}