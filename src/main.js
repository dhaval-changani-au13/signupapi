import express from "express";
import cors from "cors";
require("dotenv").config();

import mongoInit from "./models/configs/mongo";
mongoInit();
const app = express();
const Port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Health ok...");
});

import authRouter from "./routes/auth";

app.use("/api", authRouter);

app.listen(Port, (err, req, res) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`app running on http://localhost:${Port}`);
});
