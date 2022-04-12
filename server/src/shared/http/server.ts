import "reflect-metadata";
import cors from "cors";
import "./container";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import swaggerDocs from "./swagger.json";
import "./typeorm/connection";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "..", "..", "uploads"))
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT;
const optionalPORT = 5555;

app.listen(PORT || optionalPORT, () =>
    console.log(
        `Server is running on ${
            PORT === undefined ? optionalPORT : optionalPORT
        } port 🚀`
    )
);
