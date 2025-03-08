import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("\n🚀MongoDB is already connected.\n");
            return;
        }

        await mongoose.connect(process.env.NEXT_MONGODB_URI, {
            dbName: process.env.NEXT_MONGODB_DB_NAME,
        });

        console.log("\n🟢Connected to MongoDB.\n");
    } catch (error) {
        console.error("\n🔴Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
