import app from "../src/app.js";
import { connectDatabase } from "../src/config/database.config.js";

// Initialize DB connection
connectDatabase();

export default app;
