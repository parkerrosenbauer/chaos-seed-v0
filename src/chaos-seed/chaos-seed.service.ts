import { AppDataSource } from "../app";
import { ChaosSeed } from "../entities/chaos-seed.entity";
import { Race } from "../entities/race.entity";
import { Ability } from "../entities/ability.entity";
import { StartingLocation } from "../entities/starting-location.entity";
import { ChaosSeedRequestable } from "../interfaces/chaos-seed-requestable";
import { random_chance } from "../utils/random_chance";

export class ChaosSeedService {
  private chaosSeedRepo = AppDataSource.getRepository(ChaosSeed);
  private raceRepo = AppDataSource.getRepository(Race);
  private abilityRepo = AppDataSource.getRepository(Ability);
  private startLocationRepo = AppDataSource.getRepository(StartingLocation);

  async createChaosSeed(
    chaosSeedRequest: ChaosSeedRequestable
  ): Promise<ChaosSeed> {
    const allRaces = await this.raceRepo.find();
    if (allRaces.length === 0) {
      throw new Error("No races available for assignment.");
    }

    const allAbilities = await this.abilityRepo.find();
    if (allAbilities.length === 0) {
      throw new Error("No abilities available for assignment.");
    }

    const startLocation = await this.startLocationRepo.findOneBy({
      id: chaosSeedRequest.startingLocationId,
    });
    if (!startLocation) {
      throw new Error(
        `No starting location associated with id: ${chaosSeedRequest.startingLocationId}`
      );
    }

    const randomRace = random_chance<Race>(allRaces);
    const randomAbility = [random_chance<Ability>(allAbilities)];
    const languages = "common, " + randomRace.startingLanguage;

    const chaosSeed = new ChaosSeed(
      chaosSeedRequest.name,
      languages,
      startLocation,
      randomRace,
      randomAbility
    );

    return this.chaosSeedRepo.save(chaosSeed);
  }
}
