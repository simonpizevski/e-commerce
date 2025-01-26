import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connectToDB} from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        await connectToDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required!" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET || "secret-key",
            { expiresIn: "1h" }
        );

        return NextResponse.json({
            message: "Login successful",
            token,
        });
    } catch (error: any) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}