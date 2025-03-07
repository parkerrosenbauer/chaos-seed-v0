import { AppDataSource } from "../app";
import { ChaosSeed } from "../entities/chaos-seed.entity";
import { Race } from "../entities/race.entity";
import { Ability } from "../entities/ability.entity";
import { StartingLocation } from "../entities/starting-location.entity";
import { ChaosSeedRequestable } from "../interfaces/chaos-seed";
import { ChaosSeedCreatable } from "../interfaces/chaos-seed";
import { random_chance } from "../utils/random_chance";
import { clean_name } from "../utils/clean_name";
import { Identifiable } from "../interfaces/identifiable";

export class ChaosSeedService {
  private chaosSeedRepo = AppDataSource.getRepository(ChaosSeed);
  private raceRepo = AppDataSource.getRepository(Race);
  private abilityRepo = AppDataSource.getRepository(Ability);
  private startLocationRepo = AppDataSource.getRepository(StartingLocation);

  async randomStartingLocation(): Promise<StartingLocation> {
    const allStarts = await this.startLocationRepo.find();
    if (allStarts.length === 0) {
      throw new Error("No starting locations available.");
    }
    const randomStart = random_chance<StartingLocation>(allStarts);
    return randomStart;
  }

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
    const randomAbility = random_chance<Ability>(allAbilities);
    const languages = "Common, " + randomRace.startingLanguage;
    const choasSeedConfig: ChaosSeedCreatable = {
      startingLocation: startLocation,
      firstName: clean_name(chaosSeedRequest.firstName),
      languages: languages,
      abilities: [randomAbility],
      race: randomRace,
    };

    const chaosSeed = new ChaosSeed(choasSeedConfig);

    return this.chaosSeedRepo.save(chaosSeed);
  }

  async getChaosSeed(chaosSeedId: Identifiable): Promise<ChaosSeed> {
    const chaosSeed = await this.chaosSeedRepo.findOneBy({
      id: chaosSeedId.id,
    });
    if (!chaosSeed) {
      throw new Error(`No Chaos Seed associated with id: ${chaosSeedId.id}`);
    }
    return chaosSeed;
  }

  async trackDeath(startingLocationId: Identifiable): Promise<ChaosSeed> {
    const fatalStartLocation = await this.startLocationRepo.findOneBy({
      id: startingLocationId.id,
    });
    if (!fatalStartLocation) {
      throw new Error(
        `No starting location associated with id: ${startingLocationId.id}`
      );
    }
    const chaosSeedConfig: ChaosSeedCreatable = {
      startingLocation: fatalStartLocation,
      isDeadOnArrival: true,
    };
    const chaosSeed = new ChaosSeed(chaosSeedConfig);
    return this.chaosSeedRepo.save(chaosSeed);
  }
}
