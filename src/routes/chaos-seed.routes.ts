import { Router } from "express";
import { ChaosSeedController } from "../controllers/chaos-seed.controller";

export const chaosSeedRouter: Router = Router();

// determine a starting location
chaosSeedRouter.get(
  "/random-starting-location",
  ChaosSeedController.randomStartingLocation
);

// create a ChaosSeed
chaosSeedRouter.post("/chaos-seed", ChaosSeedController.createChaosSeed);

// track dead on arrival ChaosSeed
chaosSeedRouter.post("/track-death", ChaosSeedController.trackDeath);

// get a ChaosSeed
chaosSeedRouter.get("/chaos-seed", ChaosSeedController.getChaosSeed);
