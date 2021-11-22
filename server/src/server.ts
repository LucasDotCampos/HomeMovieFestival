import "reflect-metadata";
import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";

import "./database/connect";
import routes from "./routes";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads"))); //upload de imagens

app.listen(PORT, () => {
  console.log(`server started at ${PORT} port`);
});
