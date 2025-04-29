import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class Database {
    static async connect() {
        try {
            const uri = process.env.MONGODB_URI;

            if (!uri) {
                throw new Error('MONGODB_URI is not defined');
            }

            await mongoose.connect(uri);
            console.log("MongoDB connected successfully");

            mongoose.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error);
            });

        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            process.exit(1);
        }
    }
}