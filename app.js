import config from "./config/default.json" assert { type: "json" };
import express from "express";

import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import recordRouter from "./routes/record.routes.js";
import settingsDestinationRouter from "./routes/settings.destination.routes.js";
import settingsProductRouter from "./routes/settings.product.routes.js";
import settingsForwarderRouter from "./routes/settings.forwarder.routes.js";

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/records", recordRouter);
app.use("/api/settings/destination", settingsDestinationRouter);
app.use("/api/settings/product", settingsProductRouter);
app.use("/api/settings/forwarder", settingsForwarderRouter);

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
