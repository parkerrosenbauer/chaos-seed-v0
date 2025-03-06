import { Request, Response, Router } from "express";
import { instanceToPlain } from "class-transformer";

import { AppDataSource } from "../app";
import { StartingLocation } from "../entities/starting-location.entity";
import { random_chance } from "../utils/random_chance";
import { ChaosSeedService } from "./chaos-seed.service";
import { ChaosSeedRequestable } from "../interfaces/chaos-seed-requestable";

// fire the router function
export const chaosSeedRouter: Router = Router();

// determine a starting location
chaosSeedRouter.get(
  "/random-starting-location",
  async (_: Request, res: Response) => {
    // randomly assign a starting location
    const startLocationRepo = AppDataSource.getRepository(StartingLocation);
    const allStarts = await startLocationRepo.find();
    if (allStarts.length === 0) {
      throw new Error("No starting locations available.");
    }
    const randomStart = random_chance<StartingLocation>(allStarts);
    res.json(instanceToPlain(randomStart)).status(200);
  }
);

// create a ChaosSeed
chaosSeedRouter.post(
  "/create-chaos-seed",
  async (req: Request<ChaosSeedRequestable>, res: Response) => {
    // capture the starting location id and name
    const chaosSeedRequest = req.body;
    const chaosSeedService = new ChaosSeedService();
    const newChaosSeed =
      await chaosSeedService.createChaosSeed(chaosSeedRequest);
    res.json(newChaosSeed).status(200);
  }
);
