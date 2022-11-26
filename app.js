import config from "./config/default.json" assert { type: "json" };
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRouter from "./routes/auth.routes.js";
import recordRouter from "./routes/record.routes.js";
import settingsOrganizationRouter from "./routes/settings.organization.routes.js";
import settingsProductRouter from "./routes/settings.product.routes.js";
import settingsForwarderRouter from "./routes/settings.forwarder.routes.js";
import statsRouter from "./routes/statistics.routes.js";

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/records", recordRouter);
app.use("/api/settings/organization", settingsOrganizationRouter);
app.use("/api/settings/product", settingsProductRouter);
app.use("/api/settings/forwarder", settingsForwarderRouter);
app.use("/api/statistics", statsRouter);

let PORT = config.port || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//загрузка фронтенд статики с помощью middleware
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  //все остальные запросы отправляем на index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  PORT = config.portProduction || 5000;
}

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
