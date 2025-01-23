import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

export const connectToDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB is already connected.");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, { dbName: "ecommerce" });
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};