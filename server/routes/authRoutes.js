
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ============================================
// REGISTER
// ============================================

router.post("/register", async (req, res) => {
    try {
        console.log("================================");
        console.log("POST /api/auth/register");
        console.log("REGISTER BODY:", {
            name: req.body.name,
            email: req.body.email,
            password: "[HIDDEN]",
        });
        console.log("================================");

        const {
            name,
            email,
            password,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message:
                    "Please enter name, email and password",
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error(
                "JWT_SECRET is missing from .env"
            );

            return res.status(500).json({
                message:
                    "JWT_SECRET is missing from server configuration",
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        console.log(
            "USER REGISTERED:",
            user.email
        );

        return res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("================================");
        console.error("REGISTER ERROR:", error);
        console.error(
            "REGISTER ERROR MESSAGE:",
            error.message
        );
        console.error("================================");

        return res.status(500).json({
            message:
                error.message ||
                "Server error during registration",
        });
    }
});

// ============================================
// LOGIN
// ============================================

router.post("/login", async (req, res) => {
    try {
        console.log("================================");
        console.log("POST /api/auth/login");
        console.log("LOGIN EMAIL:", req.body.email);
        console.log("================================");

        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Please enter email and password",
            });
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
            console.error(
                "JWT_SECRET is missing from .env"
            );

            return res.status(500).json({
                message:
                    "JWT_SECRET is missing from server configuration",
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        console.log(
            "USER FOUND:",
            user ? user.email : "NO USER"
        );

        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid email or password",
            });
        }

        // Check password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        console.log(
            "PASSWORD MATCH:",
            passwordMatch
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message:
                    "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        console.log(
            "LOGIN SUCCESSFUL:",
            user.email
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("================================");
        console.error("LOGIN ERROR:", error);
        console.error(
            "LOGIN ERROR MESSAGE:",
            error.message
        );
        console.error("================================");

        return res.status(500).json({
            message:
                error.message ||
                "Server error during login",
        });
    }
});

export default router;
