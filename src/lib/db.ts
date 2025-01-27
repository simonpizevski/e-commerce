import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

let isConnected = false;

export const connectToDB = async (): Promise<void> => {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("MongoDB is already connected.");
        return;
    }

    try {
        const connection = await mongoose.connect(MONGODB_URI, {
            dbName: "ecommerce",
        });
        isConnected = !!connection.connections[0].readyState;
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};