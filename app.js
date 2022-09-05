// const express = require("express");
import express from "express";
// const config = require("config");
import config from "./config/default.json";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", authRouter);
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/records", require("./routes/record.routes"));

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
