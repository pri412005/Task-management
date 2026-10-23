import userModel from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import client from "../config/cache.js"

export async function handleRegister(req, res) {
    try {
        const { username, email, password } = req.body
        const isUserExist = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (isUserExist) {
            return res.status(409).json({
                message: "User already exist"
            })
        }
        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username, email, password: hash
        })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: "user created successfully",
            user: {
                username,
                email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong"
        })
    }

}
export async function handlegetme(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "user find Successfully",
            user: {
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}
export async function handlelogin(req, res) {
    try {
        const { username, email, password } = req.body
        const user = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (!user) {
            return res.status(409).json({
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Password is incorrect"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "user find Successfully",
            user: {
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Something went wrong"
        })
    }

}
export async function handlelogout(req, res) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        })
    }
    res.clearCookie("token")
    await client.set(`blacklist:${token}`, "revoked");
    console.log(
        await client.keys("blacklist:*")
    );
    res.status(200).json({
        message: "user logout Successfully",
    })
}
