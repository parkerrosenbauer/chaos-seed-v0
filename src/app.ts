import express, { Express } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import cors from "cors";
import bodyParser from "body-parser";

import { ChaosSeed } from "./entities/chaos-seed.entity";
import { Ability } from "./entities/ability.entity";
import { Race } from "./entities/race.entity";
import { StartingLocation } from "./entities/starting-location.entity";
import { chaosSeedRouter } from "./chaos-seed/chaos-seed.router";

// instantiate express app
const app: Express = express();
dotenv.config();

// parse request body
app.use(bodyParser.json());

// use cors install types
app.use(cors());

// create db connection
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [ChaosSeed, Race, Ability, StartingLocation],
  synchronize: true,
});

// define a server port
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log("Data source has been initialized!");
  })
  .catch((err) => {
    console.error("Error durring Data Source initialization.", err);
  });

// add the router to the root route
app.use("/", chaosSeedRouter);
