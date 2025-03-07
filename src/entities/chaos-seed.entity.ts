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
import { Identifiable } from "../interfaces/identifiable";
import { Experienced } from "../interfaces/experienced";
import { ChaosSeedCreatable } from "../interfaces/chaos-seed";

@Entity()
export class ChaosSeed implements Identifiable, Experienced {
  // basics
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => StartingLocation,
    (startingLocation) => startingLocation.chaosSeeds
  )
  startingLocation: StartingLocation;

  @Column()
  firstName: string;

  @Column()
  level: number = 1;

  @Column()
  xp: number = 0;

  @ManyToOne(() => Race, (race) => race.chaosSeeds, { nullable: true })
  race: Race | undefined;

  @Column()
  alignment: string = "Neutral";

  @Column()
  languages: string;

  @Column()
  reputation: string = 'Level 1 "Who are you again?"';

  // stats
  @Column()
  health: number = 100;

  @Column()
  mana: number = 100;

  @Column()
  stamina: number = 100;

  // attributes
  @Column()
  strength: number = 10;

  @Column()
  agility: number = 10;

  @Column()
  dexterity: number = 10;

  @Column()
  constitution: number = 10;

  @Column()
  endurance: number = 10;

  @Column()
  intelligence: number = 10;

  @Column()
  wisdom: number = 10;

  @Column()
  charisma: number = 10;

  @Column()
  luck: number = 10;

  // other
  @Column()
  resistances: string = "None";

  @Column()
  skills: string = "None";

  @Column()
  marks: string = "None";

  @ManyToMany(() => Ability)
  @JoinTable()
  abilities: Ability[];

  @Column()
  isDeadOnArrival: boolean;

  constructor(chaosSeedCreatable: ChaosSeedCreatable) {
    this.startingLocation = chaosSeedCreatable.startingLocation;
    this.firstName = chaosSeedCreatable?.firstName ?? "Unknown";
    this.languages = chaosSeedCreatable?.languages ?? "None";
    this.abilities = chaosSeedCreatable?.abilities ?? [];
    this.race = chaosSeedCreatable.race;
    this.isDeadOnArrival = chaosSeedCreatable?.isDeadOnArrival ?? false;
  }
}
