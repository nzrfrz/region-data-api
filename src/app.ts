import "dotenv/config";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import compression from "compression";

import { initializeRegionDB } from "./_utils";
import router from "./router";

const allowedOrigins = [
  "https://666coder-playground.vercel.app",
  "http://localhost:8001",
  undefined,
];

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  optionsSuccessStatus: 204,
}));
app.use(compression());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

const startServer = async () => {
  try {
    await initializeRegionDB();

    app.listen(process.env.PORT, () => {
      console.log(`Server Running on:\n http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server Error: \n", error.toString());
  }
};

startServer();

app.get("/api", (_, res) => {
  res.status(200).send({
    status: 200,
    message: "Server up and running, all database connected successfully...",
    data: null
  });
});

app.use("/api", router());