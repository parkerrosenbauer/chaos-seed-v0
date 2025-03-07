import { Ability } from "../entities/ability.entity";
import { Race } from "../entities/race.entity";
import { StartingLocation } from "../entities/starting-location.entity";

export interface ChaosSeedRequestable {
  startingLocationId: number;
  firstName: string;
}

export interface ChaosSeedCreatable {
  startingLocation: StartingLocation;
  firstName?: string;
  languages?: string;
  abilities?: Ability[];
  race?: Race;
  isDeadOnArrival?: boolean;
}
