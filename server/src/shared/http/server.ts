import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import AppError from "../errors/AppError";
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
  "/uploads",
  express.static(path.resolve(__dirname, "..", "..", "..", "uploads"))
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on ${PORT} port 🚀`));
