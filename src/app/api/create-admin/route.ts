import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
    try {
        await connectToDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingAdmin = await User.findOne({ email: normalizedEmail });
        if (existingAdmin) {
            return NextResponse.json({ message: "An admin with this email already exists" }, { status: 400 });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const admin = await User.create({
            email: normalizedEmail,
            password: hashedPassword,
            role: "admin",
        });

        return NextResponse.json({ message: "New admin created", admin }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}