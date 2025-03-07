import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Randomizable } from "../interfaces/randomizable";
import { Identifiable } from "../interfaces/identifiable";
import { ChaosSeed } from "./chaos-seed.entity";

@Entity()
export class Race implements Identifiable, Randomizable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  race: string;

  @Column("text")
  info: string;

  @Column()
  startingLanguage: string;

  @Column()
  chance: number;

  @OneToMany(() => ChaosSeed, (chaosSeed) => chaosSeed.race)
  chaosSeeds: ChaosSeed[];
}
