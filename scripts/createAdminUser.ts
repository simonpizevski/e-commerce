import mongoose from "mongoose";
import User from "../src/models/User";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const email = process.env.ADMIN_EMAIL!;
        const password = process.env.ADMIN_PASSWORD!;

        if (!email || !password) {
            throw new Error("Admin email or password is not set in environment variables.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminUser = new User({
            email,
            password: hashedPassword,
            role: "admin",
        });

        await adminUser.save();
        console.log("Admin user created:", adminUser);
    } catch (err) {
        console.error("Error creating admin user:", err);
    } finally {
        await mongoose.disconnect();
    }
};

createAdminUser();