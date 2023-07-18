import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import "./shared/providers/container";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import routes from "./shared/http/routes";
import swaggerDocs from "./shared/http/swagger.json";

import "./shared/typeorm/connection";

import { dataSource } from "./shared/typeorm/connection";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "uploads"))
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

dataSource
    .initialize()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.error("Database connection error: ", err.message);
    });

app.listen(PORT, () => console.log(`Server is running on ${PORT} port 🚀`));
