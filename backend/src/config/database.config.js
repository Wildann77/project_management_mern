import mongoose from "mongoose";
import { config } from "./app.config.js"; // jangan lupa .js di ESM

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // matikan server kalau DB gagal connect
  }
};
