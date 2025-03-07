import { AppDataSource } from "../app";
import { ChaosSeed } from "../entities/chaos-seed.entity";

export class StatsService {
  private chaosSeedRepo = AppDataSource.getRepository(ChaosSeed);

  async getTotalChaosSeeds(): Promise<number> {
    return this.chaosSeedRepo.count();
  }

  async getTotalDeadOnArrival(): Promise<number> {
    return this.chaosSeedRepo.count({
      where: { isDeadOnArrival: true },
    });
  }

  async getGlobalStats(): Promise<object> {
    return {
      totalChaosSeeds: await this.getTotalChaosSeeds(),
      totalDeadOnArrival: await this.getTotalDeadOnArrival(),
    };
  }
}
