import { createConnection } from "typeorm";

createConnection().then(() =>
  console.log("connected successfully to database 💯")
);
