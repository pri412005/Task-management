import express from "express"
import { handleRegister, handlelogin, handlegetme, handlelogout } from "../controller/auth.controller.js"
import { finduser } from "../middleware/auth.middleware.js"
const authRoutes = express.Router()

authRoutes.post("/register", handleRegister)
authRoutes.post("/login", handlelogin)
authRoutes.get("/me", finduser, handlegetme)
authRoutes.get("/logout", finduser, handlelogout)

export default authRoutes