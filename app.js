import express from "express";
import config from "./config/default.json";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import recordRouter from "./routes/record.routes.js";
import settingDestinationRouter from "./routes/settings.destination.routes.js";

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/records", recordRouter);
app.use("/api/settings/destination", settingDestinationRouter);

const PORT = config.port || 5000;

async function start() {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`started on port ${PORT}...`));
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
}

start();
