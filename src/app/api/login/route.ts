import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connectToDB} from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

const loginRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 5,
    message: { message: "Too many login attempts, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

export const POST = loginRateLimiter(async (request: Request) => {
    try {
        await connectToDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required!" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET || "default-secret-key",
            { expiresIn: "30m" }
        );

        return NextResponse.json({
            message: "Login successful",
            token,
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
});