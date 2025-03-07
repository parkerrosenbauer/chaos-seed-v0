import { Request, Response } from "express";

import { ChaosSeedService } from "../services/chaos-seed.service";
import { ChaosSeedRequestable } from "../interfaces/chaos-seed";
import { Identifiable } from "../interfaces/identifiable";

export class ChaosSeedController {
  static async randomStartingLocation(_req: Request, res: Response) {
    const chaosSeedService = new ChaosSeedService();
    const randomLocation = await chaosSeedService.randomStartingLocation();
    res.json(randomLocation).status(200);
  }

  static async createChaosSeed(
    req: Request<ChaosSeedRequestable>,
    res: Response
  ) {
    const chaosSeedService = new ChaosSeedService();
    const chaosSeedInfo: ChaosSeedRequestable = req.body;
    const newChaosSeed = await chaosSeedService.createChaosSeed(chaosSeedInfo);
    res.json(newChaosSeed).status(200);
  }

  static async trackDeath(req: Request<Identifiable>, res: Response) {
    const chaosSeedService = new ChaosSeedService();
    const chaosSeedInfo: Identifiable = req.body;
    const deadChaosSeed = await chaosSeedService.trackDeath(chaosSeedInfo);
    res.json(deadChaosSeed).status(200);
  }

  static async getChaosSeed(req: Request<ChaosSeedRequestable>, res: Response) {
    const chaosSeedService = new ChaosSeedService();
    const chaosSeedInfo: Identifiable = req.body;
    const chaosSeed = await chaosSeedService.getChaosSeed(chaosSeedInfo);
    res.json(chaosSeed).status(200);
  }
}
