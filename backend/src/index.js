import app from "./app.js";
import { config } from "./config/app.config.js";
import { connectDatabase } from "./config/database.config.js";

// start server
app.listen(config.PORT, async () => {
  console.log(
    `🚀 Server listening on port ${config.PORT} in ${config.NODE_ENV}`
  );
  await connectDatabase();
  console.log("database connected");
});
