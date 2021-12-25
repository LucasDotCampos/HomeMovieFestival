import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import "dotenv/config";
import "./typeorm/connection";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "..", "..", "uploads"))
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on ${PORT} port 🚀`));
