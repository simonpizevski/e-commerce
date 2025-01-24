import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";

const createAdmin = async () => {
    try {
        // Connect to MongoDB database
        await mongoose.connect(process.env.MONGODB_URI || "", {
            dbName: "ecommerce", // Add your database name if needed
        });

        // Set email and password for the new admin
        const email = "simon@admin.com"; // Change this to your admin email
        const password = "pw123"; // Change this to a secure password

        // Check if the admin already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log("An admin with this email already exists:", email);
            process.exit(0);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new admin
        const admin = await User.create({
            email,
            password: hashedPassword,
            role: "admin", // Set the role to admin
        });

        console.log("New admin created:");
        console.log("Email:", admin.email);
        console.log("Password (plaintext):", password); // Print the password if you need it
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();