import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Ability } from "./ability.entity";
import { Race } from "./race.entity";
import { StartingLocation } from "./starting-location.entity";

@Entity()
export class ChaosSeed {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  name: string;

  @Column({
    type: "int",
  })
  chaosPoints: number = 0;

  @Column({
    type: "text",
  })
  languages: string;

  @ManyToOne(
    () => StartingLocation,
    (startingLocation) => startingLocation.chaosSeeds
  )
  startingLocation: StartingLocation;

  @ManyToOne(() => Race, (race) => race.chaosSeeds)
  race: Race;

  @ManyToMany(() => Ability)
  @JoinTable()
  abilities: Ability[];

  constructor(
    n: string,
    l: string,
    sl: StartingLocation,
    r: Race,
    a: Ability[]
  ) {
    this.name = n;
    this.languages = l;
    this.startingLocation = sl;
    this.race = r;
    this.abilities = a;
  }
}
